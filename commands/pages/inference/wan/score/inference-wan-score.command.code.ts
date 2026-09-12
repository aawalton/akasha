import { basename, dirname, join } from "node:path"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { floor as floorArgument } from "akasha/commands/arguments/pages/floor.argument.ts"
import { framesDir as framesDirArgument } from "akasha/commands/arguments/pages/frames-dir.argument.ts"
import { reference as referenceArgument } from "akasha/commands/arguments/pages/reference.argument.ts"
import {
  answering,
  DATA,
  keeping,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { pathUnder } from "akasha/commands/pages/inference/flag-arguing/flag-arguing.module.code.ts"
import { inferenceWanScore as page } from "akasha/commands/pages/inference/wan/score/inference-wan-score.command.ts"
import {
  homeIn,
  imageIn,
  spawned,
} from "akasha/commands/pages/inference/wan/wan-hosting/wan-hosting.module.code.ts"

const REJECTED_INPUTS = 2

const PAGES = [floorArgument, framesDirArgument, referenceArgument]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export function wrongIn(taken: Taken): readonly string[] {
  const said = taken.floor
  if (said.trim() !== "" && Number.isFinite(Number(said))) return []
  return [`\`${floorArgument.said}\` carries a number, and \`${said}\` is not one`]
}

export function relabelledSaid(dirs: readonly string[]): string {
  return (
    `podman was handed ${dirs.join(", ")} as \`:Z\` mounts, and the SELinux labels ` +
    "on those directories were rewritten on this disk to suit the container"
  )
}

export type Scoring = (done: string[], taken: Taken, given: Given) => Promise<Answer>

async function scored(done: string[], taken: Taken, given: Given): Promise<Answer> {
  const framesDir = pathUnder(given.root, taken.framesDir)
  const referencePath = pathUnder(given.root, taken.reference)
  const referenceDir = dirname(referencePath)
  const clearing = Number(taken.floor)
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
  if (proc === null) return refusedBy(["podman is not on PATH"], OPERATIONAL)
  done.push(relabelledSaid([framesDir, referenceDir, cache]))
  const out = await new Response(proc.stdout).text()
  const err = await new Response(proc.stderr).text()
  const exited = await proc.exited
  const rows = out.split("\n").filter((one) => one !== "")
  if (exited === REJECTED_INPUTS) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return keeping(
      done,
      refusedBy(
        [
          "the scorer would not take the inputs — no face was found in the reference, " +
            `or the frames directory is not there — ${last}`,
        ],
        DATA
      )
    )
  }
  if (exited !== 0) {
    const last = err.trimEnd().split("\n").at(-1)?.trim() ?? "no reason given"
    return keeping(done, refusedBy([`the scorer ended at ${exited} — ${last}`], OPERATIONAL))
  }
  return told(rows)
}

export async function inferenceWanScore(
  argv: readonly string[],
  given: Given,
  scoring: Scoring = scored
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const wrong = wrongIn(read.taken)
  if (wrong.length > 0) return refusedBy(wrong)
  return await answering(async (done) => await scoring(done, read.taken, given))
}
