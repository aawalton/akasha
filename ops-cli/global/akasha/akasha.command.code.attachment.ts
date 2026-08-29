export const summary =
  "Run a command the akasha folder defines, reached by the slug its page carries"

import { resolve } from "node:path"
import { discarded } from "../../../agent/discarded.ts"
import { writerId } from "../../../agent/writer.ts"
import { calling } from "../../../akasha/command-system/calling.module.code.ts"

const REPO = resolve(import.meta.dir, "../../..")

export const help = {
  text: [
    "Every command akasha defines is reached through this one. `ops akasha read --file-path <p>`",
    "runs akasha's own reader over akasha's own pages.",
    "",
    "What akasha may not reach for itself is gathered here and handed over as one value: the",
    "folder, who is asking, where their readings are kept, where bodies are kept, and whether",
    "this answer is being thrown away. Nothing under `akasha/` reads the environment.",
    "",
    "A reading recorded here goes to akasha's own record under `.git/data/`, never to the record",
    "the old reader writes, so the two cannot corrupt each other during the transition.",
  ].join("\n"),
}

export function outsideNow(
  seat: string | null,
  thrownAway: string | null
): {
  repo: string
  root: string
  seat: string | null
  record: string
  bodies: string
  index: string
  discardedTo: string | null
  calledAs: string
  from: string
} {
  return {
    repo: REPO,
    root: `${REPO}/akasha`,
    seat,
    record: `${REPO}/.git/data/readings/${seat ?? "nobody"}.json`,
    bodies: `${REPO}/.git/data/bodies`,
    index: `${REPO}/.git/data/index`,
    discardedTo: thrownAway,
    calledAs: "ops akasha",
    from: process.cwd(),
  }
}

export default async function akasha(argv: readonly string[]): Promise<void> {
  const answer = calling(argv, outsideNow(writerId(), discarded()))
  for (const one of answer.report) process.stdout.write(`${one}\n`)
  for (const one of answer.refusals) process.stderr.write(`refused: ${one}\n`)
  if (answer.code !== 0) process.exitCode = answer.code
}
