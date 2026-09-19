import type { Answered } from "akasha/check/modules/audit-calling/audit-calling.module.code.ts"
import { roundAsked } from "akasha/check/modules/audit-calling/audit-calling.module.code.ts"
import type { Ran } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import {
  atOrAfter,
  type Verdict,
  verdictLogged,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { checkPagesIn } from "akasha/check/modules/checking/checking.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AUDIT_LOGS = "audit.logs"

export type Verdicts = ReadonlyMap<string, Verdict>

export type Reading = () => Verdicts

export type Round = (checks: readonly string[]) => Promise<Answered>

export type Asking = {
  readonly root: string
  readonly checks: readonly string[]
  readonly commit: string
  readonly round?: Round
  readonly done?: string[]
  readonly verdicts?: Reading
}

export type Told = {
  readonly refusals: readonly string[]
  readonly unrun: readonly string[]
  readonly unanswered: readonly string[]
  readonly broken: string | null
}

function pagesIn(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const path of checkPagesIn(root)) {
    const slug = partedIn(path)?.slug
    if (slug !== undefined) found.set(slug, path)
  }
  return found
}

export function verdictsFor(root: string, checks: readonly string[]): Verdicts {
  const pages = pagesIn(root)
  const found = new Map<string, Verdict>()
  for (const one of checks) {
    const page = pages.get(one)
    const said = page === undefined ? null : verdictLogged(root, page, AUDIT_LOGS)
    if (said !== null) found.set(one, said)
  }
  return found
}

async function unansweredIn(
  root: string,
  verdicts: Verdicts,
  checks: readonly string[],
  commit: string
): Promise<readonly string[]> {
  const left: string[] = []
  for (const one of checks) {
    const held = verdicts.get(one)
    if (held === undefined || !(await atOrAfter(root, commit, held.commit))) left.push(one)
  }
  return left
}

export function refusalsIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.flatMap((one) => {
    const held = verdicts.get(one)
    if (held === undefined) return []
    return held.refusals.map((two) => `${one} at ${held.commit} — ${two}`)
  })
}

export function unrunIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.filter((one) => verdicts.get(one)?.unrun === true)
}

export function verdictsWith(held: Verdicts, ran: readonly Ran[]): Verdicts {
  const found = new Map(held)
  for (const one of ran) found.set(one.check, one.verdict)
  return found
}

export async function asked(given: Asking): Promise<Told> {
  const ask =
    given.round ?? ((checks: readonly string[]) => roundAsked(given.root, checks, given.commit))
  const done = given.done ?? []
  const reading = given.verdicts ?? ((): Verdicts => verdictsFor(given.root, given.checks))
  let verdicts = reading()
  let left = await unansweredIn(given.root, verdicts, given.checks, given.commit)
  let broken: string | null = null
  if (left.length > 0) {
    const answered = await ask(left)
    if ("refused" in answered) {
      broken = answered.refused
    } else {
      done.push(left.join(", "))
      verdicts = verdictsWith(verdicts, answered.ran)
      left = await unansweredIn(given.root, verdicts, given.checks, given.commit)
    }
  }
  const answered = given.checks.filter((one) => !left.includes(one))
  return {
    refusals: refusalsIn(verdicts, answered),
    unrun: unrunIn(verdicts, answered),
    unanswered: left,
    broken,
  }
}
