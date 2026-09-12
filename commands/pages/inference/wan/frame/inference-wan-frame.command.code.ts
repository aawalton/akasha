import { mkdir, readdir } from "node:fs/promises"
import { basename, dirname, extname, join } from "node:path"
import {
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Shape } from "akasha/commands/pages/inference/wan/flag-arguing/flag-arguing.module.code.ts"
import type {
  Taken,
  Taking,
} from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import {
  at,
  numberIn,
  readIn,
} from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import { spawned } from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"

const FRAME_PATTERN = /^frame-\d{4}\.png$/

const TAKING: Taking = {
  shapes: new Map<string, Shape>([
    ["--video", "token"],
    ["--fps", "token"],
    ["--out-dir", "token"],
  ]),
  filled: new Map<string, string>(),
  needed: ["--video"],
}

export function readFrame(argv: readonly string[]): ReturnType<typeof readIn> {
  return readIn(argv, TAKING)
}

async function framing(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const videoPath = at(given, said.get("--video") ?? "")
  const fps = numberIn(said, "--fps")
  if (fps === 0) return refused("`--fps` is one frame a second or more", INPUT)
  if (!(await Bun.file(videoPath).exists())) {
    return refused(`\`--video\` names \`${videoPath}\`, and nothing is there`, DATA)
  }
  const stem = basename(videoPath, extname(videoPath))
  const outSaid = said.get("--out-dir")
  const outDir =
    outSaid === undefined ? join(dirname(videoPath), `${stem}-frames`) : at(given, outSaid)
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
  const read = readFrame(argv)
  if ("refused" in read) return refusedBy(read.refused)
  const report: string[] = []
  try {
    return await framing(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
