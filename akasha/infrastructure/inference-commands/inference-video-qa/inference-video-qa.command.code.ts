import { mkdtemp, readdir, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { OperationalError } from "@akasha/errors-core/exit-code"
import {
  buildFrameExtractArgs,
  buildVideoQaRequest,
  MLX_VLM_MODEL,
  runFfmpeg,
  runVideoQa,
  selectFrameIndices,
  toPngDataUrl,
} from "@akasha/inference-clients/mlx-vlm-client"
import { buildInferenceRunRecord, sha256Hex } from "@akasha/inference-runs/inference-run-record"
import { finishInferenceRun, startInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  answering,
  calledAs,
  countAt,
  heldOr,
  proseNeededAt,
  refusalIn,
  refusedBy,
  serviceNamed,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

const VIDEO = "--video"

const FRAMES_DIR = "--frames-dir"

const CHECKLIST = "--checklist"

const FRAMES = "--frames"

const FPS = "--fps"

const TIMEOUT = "--timeout"

const TAKING = [
  { said: VIDEO, aliases: ["--in"] },
  { said: FRAMES_DIR },
  { said: CHECKLIST, aliases: ["--prompt"], prose: true },
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
  if (every.length === 0) throw new OperationalError(`no PNG frames stand in ${dir}`)
  const urls: string[] = []
  for (const at of selectFrameIndices(every.length, wanted)) {
    const path = every[at]
    if (path === undefined) continue
    urls.push(toPngDataUrl(await readFile(path)))
  }
  return urls
}

export async function inferenceVideoQa(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

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

  return await answering(async () => {
    const reached = serviceNamed(SERVICE)
    let taken: string | undefined
    try {
      let imageDataUrls: readonly string[]
      let videoFields: { inputVideoPath: string; inputVideoSha256: string } | undefined
      if (videoPath !== undefined) {
        let clipBytes: Uint8Array
        try {
          clipBytes = await readFile(videoPath)
        } catch {
          return refusedBy([`\`${VIDEO}\` names \`${videoPath}\`, which will not read`])
        }
        videoFields = { inputVideoPath: videoPath, inputVideoSha256: sha256Hex(clipBytes) }
        taken = await mkdtemp(join(tmpdir(), "inference-video-qa-"))
        await runFfmpeg(
          buildFrameExtractArgs({
            videoPath,
            outDir: taken,
            ...(fps === undefined ? {} : { fps }),
          })
        )
        imageDataUrls = await urlsIn(taken, frames)
      } else if (framesDir !== undefined) {
        imageDataUrls = await urlsIn(framesDir, frames)
      } else {
        return refusedBy([`this names \`${VIDEO}\` or \`${FRAMES_DIR}\`, and nothing did`])
      }

      const record = buildInferenceRunRecord({
        service: SERVICE,
        operation: "video-qa",
        model: MLX_VLM_MODEL,
        host: reached.service.host,
        commandLine: calledAs("inference-video-qa", argv),
        startedAt: new Date().toISOString(),
        prompt: checklist,
        frames: imageDataUrls.length,
        ...(fps === undefined ? {} : { fps }),
        ...(videoFields ?? {}),
      })

      const pageId = await startInferenceRun(record)
      const startMs = Date.now()
      try {
        const answer = await runVideoQa({
          baseUrl: reached.baseUrl,
          body: buildVideoQaRequest({
            model: MLX_VLM_MODEL,
            checklist,
            imageDataUrls: [...imageDataUrls],
          }),
          timeoutMs: timeout * SECOND_MS,
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
  })
}
