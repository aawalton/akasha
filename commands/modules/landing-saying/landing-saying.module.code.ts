import { pathsOf as pathsOfRow } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { UNNAMED } from "akasha/commands/modules/committing/committing.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { CHECKING_AT } from "akasha/commands/modules/gate-building/gate-building.module.code.ts"
import type { Counting } from "akasha/commands/modules/judged-saying/judged-saying.module.code.ts"
import {
  judgedBy,
  reachedIn,
} from "akasha/commands/modules/judged-saying/judged-saying.module.code.ts"
import type { Drafted, Landed } from "akasha/commands/modules/landing/landing.module.code.ts"
import type { Filled } from "akasha/commands/modules/value-minting/value-minting.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export type Saying = (said: Landed) => readonly string[]

export type Reported = {
  readonly saying: Saying
  readonly plainly: Saying
  readonly changes: readonly FileChange[]
  readonly bypassed: string | null
  readonly broken: string | null
  readonly checks: number
  readonly aside: readonly string[]
}

export function formattedSaid(paths: readonly string[]): readonly string[] {
  return paths.map(
    (one) => `formatted ${one} as it landed — what is there is not what was handed in`
  )
}

export function filledSaid(filled: readonly Filled[]): readonly string[] {
  return filled.map(
    (one) =>
      `worked out ${one.keys.map((key) => `\`${key}\``).join(", ")} for ${one.path} as it landed` +
      ` — ${one.why}`
  )
}

export function defaultMessage(what: string, paths: readonly string[]): string {
  if (paths.length <= 3) return `${what} ${[...paths].sort().join(", ")}`
  return `${what} ${paths.length} files`
}

export function pathsOf(changes: readonly FileChange[]): readonly string[] {
  return [...new Set(changes.flatMap(pathsOfRow))]
}

export function committedLine(said: Landed): string {
  if (said.commit === null) return "nothing was committed — what was asked for is already there"
  if (said.commit === UNNAMED) return "committed — the commit could not be named"
  return `committed as ${said.commit}`
}

function reportOf(count: Counting, said: Landed, over: Reported): readonly string[] {
  const found = [...over.saying(said)]
  found.push(...over.aside)
  if (over.bypassed === null) {
    const paths = pathsOf(over.changes)
    found.push(judgedBy(count, over.checks, reachedIn(paths), paths.length))
  } else {
    found.push(over.bypassed)
    if (over.broken !== null) {
      found.push(
        `the checks could not be loaded from ${CHECKING_AT} either, so none could have run — ${over.broken}`
      )
    }
  }
  found.push(...said.noted.map((one) => `the index took less than the whole of this — ${one}`))
  found.push(committedLine(said))
  return found
}

export function reported(count: Counting, said: Landed, over: Reported): readonly string[] {
  try {
    return reportOf(count, said, over)
  } catch (thrown) {
    return [
      ...over.plainly(said),
      ...over.aside,
      committedLine(said),
      `the report could not be built — ${whyOf(thrown)}`,
    ]
  }
}

export function alsoFailed(act: () => undefined): string | null {
  try {
    act()
    return null
  } catch (thrown) {
    return saidBy(thrown)
  }
}

export function alsoSaid(why: string, back: string | null, off: string | null): string {
  const held = [why]
  if (back !== null) {
    held.push(`the index still names what did not land, and putting it back failed too: ${back}`)
    held.push("`akasha index refresh` builds the index again")
  }
  if (off !== null) held.push(`what was staged is staged still: ${off}`)
  return held.join("; ")
}

export function draftedSaid(
  said: Drafted,
  at: string | null,
  aside: readonly string[]
): readonly string[] {
  return [
    ...aside,
    ...said.drafted.map((one) => `drafted ${one}`),
    `the edits are kept at ${at ?? "the page of the agent that asked"}` +
      ", and `akasha change apply` lands them",
  ]
}
