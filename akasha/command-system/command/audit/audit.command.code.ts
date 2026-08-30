import { resolve } from "node:path"
import type { Gathered } from "../../../checks-system/checking/checking.module.code.ts"
import {
  checksAt,
  checksIn,
  everythingIn,
  judgingBy,
} from "../../../checks-system/checking/checking.module.code.ts"
import type {
  Judged,
  Judging,
  Leaving,
} from "../../../checks-system/judging/judging.module.code.ts"
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

export function narrowedTo(every: readonly Gathered[], named: readonly string[]): Narrowed {
  if (named.length === 0) return { checks: every, refusals: [] }
  const standing = new Map(every.map((one) => [one.slug, one]))
  const checks: Gathered[] = []
  const refusals: string[] = []
  for (const one of named) {
    const found = standing.get(one)
    if (found === undefined) {
      refusals.push(
        `\`${one}\` is no check that runs at audit — those that do are ` +
          `\`${every.map((two) => two.slug).join("`, `")}\``
      )
      continue
    }
    checks.push(found)
  }
  return { checks, refusals }
}

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length - held.length, "more refusal")} is not here — one answer holds ` +
          `${ceiling} bytes, and what stands above is where to start`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function judgedOver(judging: Judging, leaving: Leaving, atAudit: number): Answer {
  if (judging.named.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  let said: readonly Judged[]
  try {
    said = judging.over(leaving)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const left = atAudit - judging.named.length
  const by =
    left > 0
      ? `${counted(judging.named.length, "check")} of the ${atAudit} that run at audit`
      : counted(judging.named.length, "check")
  const over = `${by} judged ${counted(leaving.changed.length, "file")}`
  const also =
    left > 0
      ? [`this is not an audit — the ${counted(left, "check")} it left out judged nothing`]
      : []
  if (said.length === 0) {
    return { report: [`${over}, and none refused`, ...also], refusals: [], code: 0 }
  }
  const lines = said.map((one) => `${one.path} — ${oneLine(one.reason)}`)
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} stands`, ...also],
    refusals: heldTo(lines, ANSWER_CEILING),
    code: 2,
  }
}

export function audit(argv: readonly string[], given: Given): Answer {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  let every: readonly Gathered[]
  let leaving: Leaving
  try {
    every = checksAt(checksIn(root), AUDIT)
    leaving = everythingIn(root)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  if (every.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  const narrowed = narrowedTo(every, meant.only)
  if (narrowed.refusals.length > 0) return { report: [], refusals: [...narrowed.refusals], code: 1 }
  return judgedOver(judgingBy(narrowed.checks), leaving, every.length)
}
