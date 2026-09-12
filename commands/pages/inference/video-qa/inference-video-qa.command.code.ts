import { mkdtemp, readdir, readFile, rm } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  buildFrameExtractArgs,
  buildVideoQaRequest,
  MLX_VLM_MODEL,
  runFfmpeg,
  runVideoQa,
  selectFrameIndices,
  toPngDataUrl,
} from "akasha/infrastructure/inference/clients/mlx-vlm-client/mlx-vlm-client.module.code.ts"
import {
  countAt,
  heldOr,
  madeOf,
  proseNeededAt,
  serviceNamed,
  wasRefused,
  wordsIn,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import {
  finishInferenceRun,
  startInferenceRun,
} from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

const VIDEO = "--video"

const FRAMES_DIR = "--frames-dir"

const CHECKLIST = "--checklist"

const FRAMES = "--frames"

const FPS = "--fps"

const TIMEOUT = "--timeout"

const TAKING = [
  { said: VIDEO },
  { said: FRAMES_DIR },
  { said: CHECKLIST, prose: true },
  { said: FRAMES },
  { said: FPS },
  { said: TIMEOUT },
]

const SERVICE = "mlx-vlm"

const DEFAULT_FRAMES = 16

const DEFAULT_TIMEOUT_SEC = 600

const SECOND_MS = 1000

const PNG = ".png"

async function pngsIn(dir: string): Promise<readonly string[]> {
  const names = (await readdir(dir)).filter((one) => one.toLowerCase().endsWith(PNG)).sort()
  return names.map((one) => join(dir, one))
}

async function urlsIn(dir: string, wanted: number): Promise<readonly string[]> {
  const every = await pngsIn(dir)
  if (every.length === 0) throw new OperationalError(`no PNG frames are in ${dir}`)
  const urls: string[] = []
  for (const at of selectFrameIndices(every.length, wanted)) {
    const path = every[at]
    if (path === undefined) continue
    urls.push(toPngDataUrl(await readFile(path)))
  }
  return urls
}

export type Read = {
  readonly checklist: string
  readonly frames: number
  readonly fps: number | undefined
  readonly timeout: number
  readonly videoPath: string | undefined
  readonly framesDir: string | undefined
  readonly commandLine: string
}

export type Asking = (done: string[], read: Read) => Promise<Answer>

export function decodedSaid(videoPath: string): string {
  return (
    `ffmpeg was run over ${videoPath} on this machine to take frames out of it, ` +
    "and that run is not undone by the frames being cleared away again"
  )
}

async function asked(done: string[], read: Read): Promise<Answer> {
  const reached = serviceNamed(SERVICE)
  let taken: string | undefined
  try {
    let imageDataUrls: readonly string[]
    let videoFields: { inputVideoPath: string; inputVideoSha256: string } | undefined
    if (read.videoPath !== undefined) {
      let clipBytes: Uint8Array
      try {
        clipBytes = await readFile(read.videoPath)
      } catch {
        return refusedBy([`\`${VIDEO}\` names \`${read.videoPath}\`, which will not read`])
      }
      videoFields = { inputVideoPath: read.videoPath, inputVideoSha256: sha256Hex(clipBytes) }
      taken = await mkdtemp(join(SCRATCH_AT, "inference-video-qa-"))
      await runFfmpeg(
        buildFrameExtractArgs({
          videoPath: read.videoPath,
          outDir: taken,
          ...(read.fps === undefined ? {} : { fps: read.fps }),
        })
      )
      done.push(decodedSaid(read.videoPath))
      imageDataUrls = await urlsIn(taken, read.frames)
    } else if (read.framesDir !== undefined) {
      imageDataUrls = await urlsIn(read.framesDir, read.frames)
    } else {
      return refusedBy([`this names \`${VIDEO}\` or \`${FRAMES_DIR}\`, and nothing did`])
    }

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "video-qa",
      model: MLX_VLM_MODEL,
      host: reached.service.host,
      commandLine: read.commandLine,
      startedAt: new Date().toISOString(),
      prompt: read.checklist,
      frames: imageDataUrls.length,
      ...(read.fps === undefined ? {} : { fps: read.fps }),
      ...(videoFields ?? {}),
    })

    const pageId = await startInferenceRun(record)
    const startMs = Date.now()
    try {
      const answer = await runVideoQa({
        baseUrl: reached.baseUrl,
        body: buildVideoQaRequest({
          model: MLX_VLM_MODEL,
          checklist: read.checklist,
          imageDataUrls: [...imageDataUrls],
        }),
        timeoutMs: read.timeout * SECOND_MS,
      })
      await finishInferenceRun(pageId, {
        status: "completed",
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - startMs,
        outputText: answer,
      })
      return told(answer.split("\n"))
    } catch (thrown) {
      await finishInferenceRun(pageId, {
        status: "failed",
        completedAt: new Date().toISOString(),
        durationMs: Date.now() - startMs,
        errorMessage: thrown instanceof Error ? thrown.message : String(thrown),
      })
      throw thrown
    }
  } finally {
    if (taken !== undefined) await rm(taken, { recursive: true, force: true })
  }
}

export async function inferenceVideoQa(
  argv: readonly string[],
  given: Given,
  asking: Asking = asked
): Promise<Answer> {
  const said = wordsIn(argv, TAKING, [])
  if (wasRefused(said)) return refusedBy(said.refused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const checklist = heldOr(await proseNeededAt(said, CHECKLIST), refusals)
  const frames = heldOr(countAt(said, FRAMES, DEFAULT_FRAMES), refusals) ?? DEFAULT_FRAMES
  const fps = heldOr(countAt(said, FPS, undefined), refusals) ?? undefined
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC

  const videoPath = said.named[VIDEO]
  const framesDir = said.named[FRAMES_DIR]
  if ((videoPath === undefined) === (framesDir === undefined)) {
    refusals.push(`this names \`${VIDEO}\` or \`${FRAMES_DIR}\`, one of them and not both`)
  }
  if (frames <= 0)
    refusals.push(`\`${FRAMES}\` takes a whole number above zero, and ${frames} is not one`)
  if (refusals.length > 0 || checklist === null) return refusedBy(refusals)

  const read: Read = {
    checklist,
    frames,
    fps,
    timeout,
    videoPath,
    framesDir,
    commandLine: madeOf(given.calledAs, argv),
  }
  return await answering(async (done) => await asking(done, read))
}
