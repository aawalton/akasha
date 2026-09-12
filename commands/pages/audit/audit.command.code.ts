import { resolve } from "node:path"
import { auditRefusalsPut } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import { asked } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import { commitOf } from "akasha/checks/modules/audit-serving/audit-serving.module.code.ts"
import type { Gathered } from "akasha/checks/modules/checking/checking.module.code.ts"
import { checksAt, checksIn } from "akasha/checks/modules/checking/checking.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { check } from "akasha/commands/arguments/pages/check.argument.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  askedAnswer,
  brokenBy,
  type Keeping,
} from "akasha/commands/modules/audit-answering/audit-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { audit as page } from "akasha/commands/pages/audit/audit.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const AUDIT = "audit"

export type Narrowed = {
  readonly checks: readonly string[]
  readonly refusals: readonly string[]
}

export function wrongIn(named: readonly string[]): readonly string[] {
  const seen = new Set<string>()
  const wrong: string[] = []
  for (const one of named) {
    if (seen.has(one)) wrong.push(`\`${one}\` is named more than once`)
    seen.add(one)
  }
  return wrong
}

export function narrowedTo(
  every: readonly Gathered[],
  atAudit: readonly Gathered[],
  named: readonly string[]
): Narrowed {
  if (named.length === 0) return { checks: atAudit.map((one) => one.slug), refusals: [] }
  const bySlug = new Set(every.map((one) => one.slug))
  const checks: string[] = []
  const refusals: string[] = []
  for (const one of named) {
    if (!bySlug.has(one)) {
      refusals.push(
        `\`${one}\` is no check the index names — those it names are ` +
          `\`${every.map((two) => two.slug).join("`, `")}\``
      )
      continue
    }
    checks.push(one)
  }
  return { checks, refusals }
}

export function leftOutOf(atAudit: readonly Gathered[], ran: readonly string[]): number {
  const slugs = new Set(ran)
  return atAudit.filter((one) => !slugs.has(one.slug)).length
}

export function notAnAuditIn(leftOut: number): readonly string[] {
  if (leftOut === 0) return []
  return [`this is not an audit — the ${counted(leftOut, "check")} it left out judged nothing`]
}

export function waitingOn(one: Gathered): string {
  const phases = one.stated ?? []
  if (phases.length === 0) return `\`${one.slug}\``
  return `\`${one.slug}\` at ${phases.join(", ")}`
}

export function notYetJudgingIn(
  every: readonly Gathered[],
  named: readonly string[]
): readonly string[] {
  if (named.length > 0) return []
  const held = every.filter((one) => one.runsOn.length === 0)
  if (held.length === 0) return []
  const waiting = held.map((one) => waitingOn(one)).join("; ")
  return [`this answer leaves out ${counted(held.length, "check")} not yet judging: ${waiting}`]
}

export async function askedOver(
  root: string,
  every: readonly Gathered[],
  named: readonly string[],
  keeping: Keeping | null,
  done: string[] = []
): Promise<Answer> {
  const atAudit = checksAt(every, AUDIT)
  const narrowed = narrowedTo(every, atAudit, named)
  if (narrowed.refusals.length > 0) return refusedBy(narrowed.refusals)
  const commit = await commitOf(root)
  const home = requireEnv("HOME")
  const told = await asked({ root, home, checks: narrowed.checks, commit, done })
  const also = [
    ...notAnAuditIn(leftOutOf(atAudit, narrowed.checks)),
    ...notYetJudgingIn(every, named),
  ]
  return askedAnswer({ told, checks: narrowed.checks.length, commit, also, rounds: done }, keeping)
}

export async function audit(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [check])
  if ("refused" in read) return refusedBy([...read.refused])
  const named = read.taken.check
  const wrong = wrongIn(named)
  if (wrong.length > 0) return refusedBy(wrong)
  const root = resolve(given.root)
  const agentPage = given.agentId === null ? null : agentPathOf(root, given.agentId)
  const keeping: Keeping | null =
    agentPage === null ? null : (whole) => auditRefusalsPut(root, agentPage, whole)
  const done: string[] = []
  try {
    return await askedOver(root, checksIn(root), named, keeping, done)
  } catch (thrown) {
    return brokenBy(thrown, done)
  }
}
