import { basename, dirname, join } from "node:path"
import {
  answering,
  DATA,
  keeping,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Shape } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
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

export function relabelledSaid(dirs: readonly string[]): string {
  return (
    `podman was handed ${dirs.join(", ")} as \`:Z\` mounts, and the SELinux labels ` +
    "on those directories were rewritten on this disk to suit the container"
  )
}

export type Scoring = (done: string[], read: Taken, given: Given) => Promise<Answer>

async function scored(done: string[], read: Taken, given: Given): Promise<Answer> {
  const said = read.said
  const framesDir = at(given, said.get("--frames-dir") ?? "")
  const referencePath = at(given, said.get("--reference") ?? "")
  const referenceDir = dirname(referencePath)
  const clearing = Number(said.get("--floor") ?? "")
  const cache = join(homeIn(), "cache")
  const proc = spawned([
    "podman",
    "run",
    "--rm",
    "--entrypoint",
    "python",
    "-v",
    `${framesDir}:/scoring/frames:Z`,
    "-v",
    `${referenceDir}:/scoring/ref:Z`,
    "-v",
    `${cache}:/root/.cache:Z`,
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
    return { report: [], refusals: ["podman is not on PATH"], code: OPERATIONAL }
  }
  done.push(relabelledSaid([framesDir, referenceDir, cache]))
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  const exited = await proc.exited
  const rows = out.split("\n").filter((one) => one !== "")
  if (exited === REJECTED_INPUTS) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return keeping(done, {
      report: [],
      refusals: [
        "the scorer would not take the inputs — no face was found in the reference, " +
          `or the frames directory is not there — ${last}`,
      ],
      code: DATA,
    })
  }
  if (exited !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return keeping(done, {
      report: [],
      refusals: [`the scorer ended at ${exited} — ${last}`],
      code: OPERATIONAL,
    })
  }
  return told(rows)
}

export async function inferenceWanScore(
  argv: readonly string[],
  given: Given,
  scoring: Scoring = scored
): Promise<Answer> {
  const read = readScore(argv)
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(async (done) => await scoring(done, read, given))
}
