import { mkdir, readdir } from "node:fs/promises"
import { basename, dirname, extname, join } from "node:path"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { fps as fpsArgument } from "akasha/commands/arguments/pages/fps.argument.ts"
import { outDir as outDirArgument } from "akasha/commands/arguments/pages/out-dir.argument.ts"
import { video as videoArgument } from "akasha/commands/arguments/pages/video.argument.ts"
import {
  answering,
  DATA,
  keeping,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pathUnder } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import { inferenceWanFrame as page } from "akasha/commands/pages/inference/wan/frame/inference-wan-frame.command.ts"
import { spawned } from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"

const FRAME_PATTERN = /^frame-\d{4}\.png$/

const PAGES = [fpsArgument, outDirArgument, videoArgument]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

function wrongIn(taken: Taken): readonly string[] {
  if (taken.fps !== 0) return []
  return [`\`${fpsArgument.said}\` is one frame a second or more`]
}

export type Framing = (done: string[], taken: Taken, given: Given) => Promise<Answer>

async function framesIn(outDir: string): Promise<number> {
  return (await readdir(outDir)).filter((one) => FRAME_PATTERN.test(one)).length
}

async function framed(done: string[], taken: Taken, given: Given): Promise<Answer> {
  const videoPath = pathUnder(given.root, taken.video)
  const fps = taken.fps
  if (!(await Bun.file(videoPath).exists())) {
    return refused(`\`${videoArgument.said}\` names \`${videoPath}\`, and nothing is there`, DATA)
  }
  const stem = basename(videoPath, extname(videoPath))
  const outDir =
    taken.outDir === undefined
      ? join(dirname(videoPath), `${stem}-frames`)
      : pathUnder(given.root, taken.outDir)
  await mkdir(outDir, { recursive: true })
  done.push(`made ${outDir}`)

  const proc = spawned([
    "ffmpeg",
    "-hide_banner",
    "-y",
    "-i",
    videoPath,
    ...(fps === undefined ? [] : ["-vf", `fps=${fps}`]),
    join(outDir, "frame-%04d.png"),
  ])
  if (proc === null) {
    return keeping(done, refusedBy(["ffmpeg is not on PATH — install it"], OPERATIONAL))
  }
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    const part = await framesIn(outDir)
    if (part > 0) done.push(`ffmpeg left ${String(part)} frame(s) in ${outDir}`)
    return keeping(done, refusedBy([`ffmpeg took no frames out of it — ${last}`], OPERATIONAL))
  }
  const many = await framesIn(outDir)
  done.push(`ffmpeg wrote ${String(many)} frame(s) into ${outDir}`)
  return told([`frames\t${many}`, `dir\t${outDir}`])
}

export async function inferenceWanFrame(
  argv: readonly string[],
  given: Given,
  framing: Framing = framed
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return refusedBy(wrong)
  return await answering(async (done) => await framing(done, read.taken, given))
}
