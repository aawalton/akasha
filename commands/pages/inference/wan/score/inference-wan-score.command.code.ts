import { basename, dirname, join } from "node:path"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Shape } from "akasha/commands/pages/inference/wan/flag-arguing/flag-arguing.module.code.ts"
import type {
  Taken,
  Taking,
} from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import {
  at,
  readIn,
} from "akasha/commands/pages/inference/wan/wan-arguing/wan-arguing.module.code.ts"
import {
  homeIn,
  imageIn,
  spawned,
} from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"

const REJECTED_INPUTS = 2

const TAKING: Taking = {
  shapes: new Map<string, Shape>([
    ["--frames-dir", "token"],
    ["--reference", "token"],
    ["--floor", "token"],
  ]),
  filled: new Map([["--floor", "0.45"]]),
  needed: ["--frames-dir", "--reference"],
}

export function readScore(argv: readonly string[]): ReturnType<typeof readIn> {
  return readIn(argv, TAKING)
}

async function scoring(read: Taken, given: Given, report: string[]): Promise<Answer> {
  const said = read.said
  const framesDir = at(given, said.get("--frames-dir") ?? "")
  const referencePath = at(given, said.get("--reference") ?? "")
  const clearing = Number(said.get("--floor") ?? "")
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
    String(clearing),
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

export async function inferenceWanScore(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readScore(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  const report: string[] = []
  try {
    return await scoring(read, given, report)
  } catch (thrown) {
    return { report, refusals: [whyOf(thrown)], code: 3 }
  }
}
