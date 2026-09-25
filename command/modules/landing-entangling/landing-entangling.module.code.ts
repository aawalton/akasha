import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { importingIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import { compiled } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  bodiesAt,
  reachingOf,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const APART = "\0"

export const AGAIN_JUDGED =
  "nothing was written — the checks ran against an older commit, and a landing since then" +
  " changed a file this change's files import or are imported by. No edit kept moved, so there" +
  " is nothing to drop — apply again, and every check runs against the commit at HEAD."

export function judgedOnly(refusals: readonly string[]): boolean {
  return refusals.length === 2 && refusals[1] === AGAIN_JUDGED
}

function movedBetween(root: string, judged: string, base: string): readonly string[] {
  const said = gitIn(root, ["diff", "--name-only", "--no-renames", "-z", judged, base, "--"])
  return said.split(APART).filter((one) => one !== "" && compiled(one))
}

function importersReached(index: Answering, seeds: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  const waiting = [...seeds]
  for (let at = waiting.pop(); at !== undefined; at = waiting.pop()) {
    if (found.has(at)) continue
    found.add(at)
    for (const one of index.importersOf(at)) if (compiled(one)) waiting.push(one)
  }
  return found
}

function namingReached(
  change: Change,
  index: Answering,
  touched: readonly string[],
  reached: ReadonlySet<string>
): readonly string[] {
  const naming = reachingOf(index.manifestsBeside(index.fileKeysAt()), bodiesAt(change.root))
  return touched.filter((one) => {
    const text = textOf(change.after(one))
    if (text === null) return false
    return importingIn(text, one, naming).some((named) => reached.has(named.at))
  })
}

export function entangledSince(change: Change, judged: string, base: string): readonly string[] {
  if (judged === base) return []
  const touched = change.changed.filter(compiled)
  if (touched.length === 0) return []
  const moved = movedBetween(change.root, judged, base)
  if (moved.length === 0) return []
  const index = shadowAt(change.root).index
  const reached = importersReached(index, moved)
  const found = new Set(touched.filter((one) => reached.has(one)))
  for (const one of namingReached(change, index, touched, reached)) found.add(one)
  const reaching = importersReached(index, touched)
  for (const one of moved) if (reaching.has(one)) found.add(one)
  return [...found].sort()
}

export function entangledSaid(
  found: readonly string[],
  judged: string,
  base: string
): readonly string[] {
  return [
    `${found.join(", ")} — judged against \`${judged}\`, and a landing reaching \`${base}\` ` +
      "moved a file these import or are imported by",
    AGAIN_JUDGED,
  ]
}
