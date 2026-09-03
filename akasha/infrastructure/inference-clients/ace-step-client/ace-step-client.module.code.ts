import { writeFile } from "node:fs/promises"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import { ensureOutputDir } from "../inference-output-path/inference-output-path.module.code.ts"

export interface MusicRequestParams {
  readonly prompt: string
  readonly lyrics?: string
  readonly durationSeconds: number
  readonly inferenceSteps: number
  readonly seed: number
  readonly vocalLanguage: string
  readonly audioFormat: "wav"
}

export interface ReleaseTaskBody {
  readonly prompt: string
  readonly lyrics: string
  readonly task_type: "text2music"
  readonly duration: number
  readonly inference_steps: number
  readonly batch_size: 1
  readonly seed: number
  readonly use_random_seed: false
  readonly vocal_language: string
  readonly audio_format: "wav"
}

export function buildReleaseTaskBody(params: MusicRequestParams): ReleaseTaskBody {
  return {
    prompt: params.prompt,
    lyrics: params.lyrics ?? "",
    task_type: "text2music",
    duration: params.durationSeconds,
    inference_steps: params.inferenceSteps,
    batch_size: 1,
    seed: params.seed,
    use_random_seed: false,
    vocal_language: params.vocalLanguage,
    audio_format: params.audioFormat,
  }
}

const EnvelopeSchema = z
  .object({
    code: z.number(),
    error: z.string().nullable().optional(),
  })
  .passthrough()

const ReleaseTaskDataSchema = z
  .object({
    task_id: z.string().min(1),
    status: z.string().optional(),
    queue_position: z.number().optional(),
  })
  .passthrough()

const ReleaseTaskResponseSchema = EnvelopeSchema.extend({
  data: ReleaseTaskDataSchema,
})

export function parseReleaseTaskResponse(raw: unknown): string {
  const parsed = ReleaseTaskResponseSchema.parse(raw)
  if (parsed.code !== 200 || (parsed.error !== null && parsed.error !== undefined)) {
    throw new OperationalError(`release_task rejected: code=${parsed.code} error=${parsed.error}`)
  }
  return parsed.data.task_id
}

const QueryResultItemSchema = z
  .object({
    task_id: z.string(),
    status: z.number(),
    result: z.string().optional(),
  })
  .passthrough()

const QueryResultResponseSchema = EnvelopeSchema.extend({
  data: z.array(QueryResultItemSchema),
})

export type TaskStatus = "running" | "succeeded" | "failed"

export function interpretTaskStatus(code: number): TaskStatus {
  if (code === 1) return "succeeded"
  if (code === 2) return "failed"
  return "running"
}

export interface QueryResultOutcome {
  readonly status: TaskStatus
  readonly audioUrl?: string
}

const ResultEntrySchema = z.object({ file: z.string().min(1) }).passthrough()

export function parseQueryResult(raw: unknown, taskId: string): QueryResultOutcome {
  const parsed = QueryResultResponseSchema.parse(raw)
  if (parsed.code !== 200) {
    throw new OperationalError(`query_result rejected: code=${parsed.code} error=${parsed.error}`)
  }
  const entry = parsed.data.find((d) => d.task_id === taskId)
  if (entry === undefined) {
    return { status: "running" }
  }
  const status = interpretTaskStatus(entry.status)
  if (status !== "succeeded") return { status }
  if (entry.result === undefined || entry.result.length === 0) {
    throw new OperationalError(`task ${taskId} succeeded but carried no result payload`)
  }
  let entries: readonly z.infer<typeof ResultEntrySchema>[]
  try {
    entries = z.array(ResultEntrySchema).min(1).parse(JSON.parse(entry.result))
  } catch (err) {
    throw new OperationalError(
      `task ${taskId} result was not parseable: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  return { status: "succeeded", audioUrl: entries[0]?.file }
}

export function assertWavBytes(bytes: Uint8Array): undefined {
  const riff =
    bytes.length > 44 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46
  if (!riff) {
    throw new OperationalError("music response is not a RIFF/WAV payload")
  }
}

export interface RunMusicArgs {
  readonly baseUrl: string
  readonly params: MusicRequestParams
  readonly outputPath: string
  readonly submitTimeoutMs: number
  readonly pollIntervalMs: number
  readonly totalTimeoutMs: number
  readonly sleep: (ms: number) => Promise<void>
  readonly now: () => number
}

export interface RunMusicResult {
  readonly outputPath: string
  readonly outputBytes: Uint8Array
}

export async function runMusic(args: RunMusicArgs): Promise<RunMusicResult> {
  const { baseUrl, params, outputPath } = args
  const submitRes = await fetch(`${baseUrl}/release_task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildReleaseTaskBody(params)),
    signal: AbortSignal.timeout(args.submitTimeoutMs),
  })
  if (!submitRes.ok) {
    throw new OperationalError(`release_task failed: ${submitRes.status} ${await submitRes.text()}`)
  }
  const taskId = parseReleaseTaskResponse(await submitRes.json())
  process.stdout.write(`submitted task ${taskId}; polling…\n`)

  const startMs = args.now()
  for (;;) {
    if (args.now() - startMs > args.totalTimeoutMs) {
      throw new OperationalError(
        `task ${taskId} did not finish within ${Math.floor(args.totalTimeoutMs / 1000)}s`
      )
    }
    await args.sleep(args.pollIntervalMs)
    const pollRes = await fetch(`${baseUrl}/query_result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_id_list: [taskId] }),
      signal: AbortSignal.timeout(args.submitTimeoutMs),
    })
    if (!pollRes.ok) {
      throw new OperationalError(`query_result failed: ${pollRes.status} ${await pollRes.text()}`)
    }
    const outcome = parseQueryResult(await pollRes.json(), taskId)
    if (outcome.status === "failed") {
      throw new OperationalError(`task ${taskId} failed server-side`)
    }
    if (outcome.status === "succeeded") {
      const audioUrl = outcome.audioUrl
      if (audioUrl === undefined) {
        throw new OperationalError(`task ${taskId} succeeded but returned no audio url`)
      }
      const audioRes = await fetch(`${baseUrl}${audioUrl}`, {
        signal: AbortSignal.timeout(args.submitTimeoutMs),
      })
      if (!audioRes.ok) {
        throw new OperationalError(`audio download failed: ${audioRes.status}`)
      }
      const bytes = new Uint8Array(await audioRes.arrayBuffer())
      assertWavBytes(bytes)
      await ensureOutputDir(outputPath)
      await writeFile(outputPath, bytes)
      process.stdout.write(`wrote ${bytes.byteLength} bytes to ${outputPath}\n`)
      return { outputPath, outputBytes: bytes }
    }
  }
}
