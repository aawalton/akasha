import { UNNAMED } from "../committing/committing.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { CHECKING_AT } from "../gate-building/gate-building.module.code.ts"
import type { Counting } from "../judged-saying/judged-saying.module.code.ts"
import { draftSaid, judgedBy, reachedIn } from "../judged-saying/judged-saying.module.code.ts"
import type { Drafted, FileEdit, Landed } from "../landing/landing.module.code.ts"
import type { Filled } from "../value-minting/value-minting.module.code.ts"

export type Saying = (said: Landed) => readonly string[]

export type Reported = {
  readonly saying: Saying
  readonly changes: readonly FileEdit[]
  readonly bypassed: string | null
  readonly broken: string | null
  readonly checks: number
  readonly aside: readonly string[]
}

export function formattedSaid(paths: readonly string[]): readonly string[] {
  return paths.map(
    (one) => `formatted ${one} as it landed — what stands there is not what was handed in`
  )
}

export function filledSaid(filled: readonly Filled[]): readonly string[] {
  return filled.map(
    (one) =>
      `worked out ${one.keys.map((key) => `\`${key}\``).join(", ")} for ${one.path} as it landed` +
      ` — ${one.why}`
  )
}

export function wroteAndTook(said: Landed): readonly string[] {
  return [...said.wrote.map((one) => `wrote ${one}`), ...said.took.map((one) => `took away ${one}`)]
}

export function pathsOf(changes: readonly FileEdit[]): readonly string[] {
  return changes.map((one) => one.path)
}

export function committedLine(said: Landed): string {
  if (said.commit === null) return "nothing was committed — what was asked for already stands"
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
      ...wroteAndTook(said),
      ...over.aside,
      committedLine(said),
      `the report could not be built — ${whyOf(thrown)}`,
    ]
  }
}

export function draftedSaid(
  count: Counting,
  said: Drafted,
  at: string | null,
  aside: readonly string[],
  checks: number
): readonly string[] {
  return [
    ...aside,
    ...said.drafted.map((one) => `drafted ${one}`),
    ...draftSaid(count, checks, said.judged, said.refused, said.clashed),
    said.patch === null
      ? "the patch was worked out to nothing and taken away"
      : `the patch is kept at ${at ?? "the page of the agent that asked"} against ${said.base}`,
  ]
}
