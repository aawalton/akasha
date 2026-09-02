import { resolve } from "node:path"
import { everythingIn } from "@akasha/checks/change-walking"
import type { Gathered } from "@akasha/checks/checking"
import { checksAt, checksIn, judgingBy } from "@akasha/checks/checking"
import type { Judged, Judging } from "@akasha/checks/judging"
import type { Change } from "@akasha/pages-system/change"
import { counted } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { oneLine, whyOf } from "../../fault-saying/fault-saying.module.code.ts"

export const ANSWER_CEILING = 28000

const CHECK = "--check"

const AUDIT = "audit"

const NOTHING_RUNS =
  "no check runs at audit, so nothing would judge the folder and a clean answer would mean nothing"

export type Meant = {
  readonly only: readonly string[]
  readonly refusal: string | null
}

export type Narrowed = {
  readonly checks: readonly Gathered[]
  readonly refusals: readonly string[]
}

export function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ only: [], refusal: said })
  const only: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === CHECK) {
      const value = argv[at + 1]
      if (value === undefined) return refused(`${CHECK} names a check, and nothing followed it`)
      if (only.includes(value)) return refused(`\`${value}\` is named more than once`)
      only.push(value)
      at += 1
      continue
    }
    return refused(
      `\`${one}\` is not an argument this takes — an audit judges every file the index names, ` +
        `and only \`${CHECK} <slug>\` narrows which checks see them`
    )
  }
  return { only, refusal: null }
}

export function narrowedTo(
  every: readonly Gathered[],
  atAudit: readonly Gathered[],
  named: readonly string[]
): Narrowed {
  if (named.length === 0) return { checks: atAudit, refusals: [] }
  const bySlug = new Map(every.map((one) => [one.slug, one]))
  const checks: Gathered[] = []
  const refusals: string[] = []
  for (const one of named) {
    const found = bySlug.get(one)
    if (found === undefined) {
      refusals.push(
        `\`${one}\` is no check the index names — those it names are ` +
          `\`${every.map((two) => two.slug).join("`, `")}\``
      )
      continue
    }
    checks.push(found)
  }
  return { checks, refusals }
}

export function leftOutOf(atAudit: readonly Gathered[], ran: readonly Gathered[]): number {
  const slugs = new Set(ran.map((one) => one.slug))
  return atAudit.filter((one) => !slugs.has(one.slug)).length
}

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length, "refusal")} in all, and the ${held.length} above are what one ` +
          `answer holds at ${ceiling} bytes — begin with those`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function judgedOver(judging: Judging, change: Change, leftOut: number): Answer {
  if (judging.named.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  let said: readonly Judged[]
  try {
    said = judging.over(change)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const woke = judging.checksFor(change).length
  const over = `${counted(woke, "check")} judged ${counted(change.changed.length, "file")}`
  const also =
    leftOut > 0
      ? [`this is not an audit — the ${counted(leftOut, "check")} it left out judged nothing`]
      : []
  if (said.length === 0) {
    return { report: [`${over}, and none refused`, ...also], refusals: [], code: 0 }
  }
  const lines = said.map((one) => `${one.path} — ${oneLine(one.reason)}`)
  const unrun = said.filter((one) => one.threw === true).length
  const could =
    unrun > 0
      ? [`${counted(unrun, "check")} could not run and judged nothing, so this answer is short`]
      : []
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} in all`, ...could, ...also],
    refusals: heldTo(lines, ANSWER_CEILING),
    code: unrun > 0 ? 3 : 2,
  }
}

export function audit(argv: readonly string[], given: Given): Answer {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  let every: readonly Gathered[]
  let change: Change
  try {
    every = checksIn(root)
    change = everythingIn(root)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const atAudit = checksAt(every, AUDIT)
  const narrowed = narrowedTo(every, atAudit, meant.only)
  if (narrowed.refusals.length > 0) return { report: [], refusals: [...narrowed.refusals], code: 1 }
  return judgedOver(judgingBy(narrowed.checks), change, leftOutOf(atAudit, narrowed.checks))
}
