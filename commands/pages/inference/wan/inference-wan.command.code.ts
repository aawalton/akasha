import { mkdir, readdir } from "node:fs/promises"
import { basename, dirname, extname, join } from "node:path"
import { whyOf } from "../../../../command-system/fault-saying/fault-saying.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"
import type { Taken } from "./wan-arguing/wan-arguing.module.code.ts"
import {
  at,
  EXTEND,
  FRAMES,
  GENERATE,
  numberIn,
  readIn,
} from "./wan-arguing/wan-arguing.module.code.ts"
import { extending, generating } from "./wan-clip-rendering/wan-clip-rendering.module.code.ts"
import { homeIn, imageIn, spawned } from "./wan-hosting/wan-hosting.module.code.ts"

const REJECTED_INPUTS = 2

const FRAME_PATTERN = /^frame-\d{4}\.png$/

async function framing(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const videoPath = at(given, said.get("--video") ?? "")
  const fps = numberIn(said, "--fps")
  if (fps === 0) return refused("`--fps` is one frame a second or more", 1)
  if (!(await Bun.file(videoPath).exists())) {
    return refused(`\`--video\` names \`${videoPath}\`, and nothing stands there`, 2)
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
    return { report, refusals: ["ffmpeg is not on PATH — install it"], code: 3 }
  }
  const err = await new Response(proc.stderr).text()
  if ((await proc.exited) !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { report, refusals: [`ffmpeg took no frames out of it — ${last}`], code: 3 }
  }
  const standing = await readdir(outDir)
  const many = standing.filter((one) => FRAME_PATTERN.test(one)).length
  report.push(`frames\t${many}`, `dir\t${outDir}`)
  return { report, refusals: [], code: 0 }
}

async function scoring(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const framesDir = at(given, said.get("--frames-dir") ?? "")
  const referencePath = at(given, said.get("--reference") ?? "")
  const floor = Number(said.get("--floor") ?? "")
  const home = homeIn()
  const proc = spawned([
    "podman",
    "run",
    "--rm",
    "--entrypoint",
    "python",
    "-v",
    `${framesDir}:/scoring/frames:Z`,
    "-v",
    `${dirname(referencePath)}:/scoring/ref:Z`,
    "-v",
    `${join(home, "cache")}:/root/.cache:Z`,
    imageIn(),
    "/app/bin/score-frames.py",
    "--reference",
    `/scoring/ref/${basename(referencePath)}`,
    "--frames-dir",
    "/scoring/frames",
    "--floor",
    String(floor),
  ])
  if (proc === null) {
    return { report, refusals: ["podman is not on PATH"], code: 3 }
  }
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  const exited = await proc.exited
  const rows = out.split("\n").filter((one) => one !== "")
  if (exited === REJECTED_INPUTS) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return {
      report,
      refusals: [
        "the scorer would not take the inputs — no face was found in the reference, " +
          `or the frames directory is not there — ${last}`,
      ],
      code: 2,
    }
  }
  if (exited !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return { report, refusals: [`the scorer ended at ${exited} — ${last}`], code: 3 }
  }
  report.push(...rows)
  return { report, refusals: [], code: 0 }
}

export async function inferenceWan(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    if (read.act === GENERATE) return await generating(read, given, argv, report)
    if (read.act === EXTEND) return await extending(read, given, argv, report)
    if (read.act === FRAMES) return await framing(read, given, report)
    return await scoring(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
