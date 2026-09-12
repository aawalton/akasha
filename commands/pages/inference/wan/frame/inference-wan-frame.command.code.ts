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
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import { inferenceWanFrame as page } from "akasha/commands/pages/inference/wan/frame/inference-wan-frame.command.ts"
import { spawned } from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"

const FRAME_PATTERN = /^frame-\d{4}\.png$/

const PAGES = [fpsArgument, outDirArgument, videoArgument]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export function wrongIn(taken: Taken): readonly string[] {
  if (taken.fps !== 0) return []
  return [`\`${fpsArgument.said}\` is one frame a second or more`]
}

async function framing(taken: Taken, given: Given, report: string[]): Promise<Answer> {
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
    return { report, refusals: ["ffmpeg is not on PATH — install it"], code: OPERATIONAL }
  }
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { report, refusals: [`ffmpeg took no frames out of it — ${last}`], code: OPERATIONAL }
  }
  const written = await readdir(outDir)
  const many = written.filter((one) => FRAME_PATTERN.test(one)).length
  report.push(`frames\t${many}`, `dir\t${outDir}`)
  return { report, refusals: [], code: OK }
}

export async function inferenceWanFrame(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return refusedBy(wrong)
  const report: string[] = []
  try {
    return await framing(read.taken, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
