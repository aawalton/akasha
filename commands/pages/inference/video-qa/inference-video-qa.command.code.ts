import { mkdtemp, readdir, readFile, rm } from "node:fs/promises"
import { join } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { checklist as checklistArgument } from "akasha/commands/arguments/pages/checklist.argument.ts"
import { checklistFile } from "akasha/commands/arguments/pages/checklist-file.argument.ts"
import { fps as fpsArgument } from "akasha/commands/arguments/pages/fps.argument.ts"
import { frames as framesArgument } from "akasha/commands/arguments/pages/frames.argument.ts"
import { framesDir as framesDirArgument } from "akasha/commands/arguments/pages/frames-dir.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import { video as videoArgument } from "akasha/commands/arguments/pages/video.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceVideoQa as page } from "akasha/commands/pages/inference/video-qa/inference-video-qa.command.ts"
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
  madeOf,
  serviceNamed,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import {
  finishInferenceRun,
  startInferenceRun,
} from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"

const PAGES = [
  checklistArgument,
  checklistFile,
  framesArgument,
  framesDirArgument,
  fpsArgument,
  timeoutArgument,
  videoArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const CHECKLIST_FILING = filing(checklistArgument.said)

const SERVICE = "mlx-vlm"

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
        return refusedBy([
          `\`${videoArgument.said}\` names \`${read.videoPath}\`, which will not read`,
        ])
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
      return refusedBy([
        `this names \`${videoArgument.said}\` or \`${framesDirArgument.said}\`, and nothing did`,
      ])
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

export function wrongIn(taken: Taken): readonly string[] {
  if (taken.frames > 0) return []
  const said = framesArgument.said
  return [`\`${said}\` takes a whole number above zero, and ${taken.frames} is not one`]
}

export async function inferenceVideoQa(
  argv: readonly string[],
  given: Given,
  asking: Asking = asked
): Promise<Answer> {
  const held = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in held) return refusedBy(held.refused)
  const taken = held.taken
  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const checklist = filledIn(given.root, taken.checklist, taken.checklistFile, CHECKLIST_FILING)
  if ("refused" in checklist) return refusedBy(checklist.refused)

  const read: Read = {
    checklist: checklist.text ?? "",
    frames: taken.frames,
    fps: taken.fps,
    timeout: taken.timeout ?? DEFAULT_TIMEOUT_SEC,
    videoPath: taken.video,
    framesDir: taken.framesDir,
    commandLine: madeOf(given.calledAs, argv),
  }
  return await answering(async (done) => await asking(done, read))
}
