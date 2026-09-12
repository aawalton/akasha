import { resolve } from "node:path"
import { refusalsPut } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import { asked } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import { commitOf } from "akasha/checks/modules/audit-serving/audit-serving.module.code.ts"
import type { Gathered } from "akasha/checks/modules/checking/checking.module.code.ts"
import { checksAt, checksIn } from "akasha/checks/modules/checking/checking.module.code.ts"
import { refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  askedAnswer,
  brokenBy,
  type Keeping,
} from "akasha/commands/modules/audit-answering/audit-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const CHECK = "--check"

const AUDIT = "audit"

export type Meant = {
  readonly only: readonly string[]
  readonly refusal: string | null
}

export type Narrowed = {
  readonly checks: readonly string[]
  readonly refusals: readonly string[]
}

export function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ only: [], refusal: said })
  const only: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one !== CHECK) {
      return refused(
        `\`${one}\` is not an argument this takes — \`${CHECK} <slug>\` names a check ` +
          `the round runs beyond the ones the audit phase names`
      )
    }
    const value = argv[at + 1]
    if (value === undefined) return refused(`${one} names a check, and nothing followed it`)
    if (only.includes(value)) return refused(`\`${value}\` is named more than once`)
    only.push(value)
    at += 1
  }
  return { only, refusal: null }
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

export function notYetJudgingIn(
  every: readonly Gathered[],
  named: readonly string[]
): readonly string[] {
  if (named.length > 0) return []
  const held = every.filter((one) => one.runsOn.length === 0).length
  if (held === 0) return []
  return [`this answer leaves out ${counted(held, "check")} not yet judging`]
}

export async function askedOver(
  root: string,
  every: readonly Gathered[],
  named: readonly string[],
  keeping: Keeping | null
): Promise<Answer> {
  const atAudit = checksAt(every, AUDIT)
  const narrowed = narrowedTo(every, atAudit, named)
  if (narrowed.refusals.length > 0) return refusedBy(narrowed.refusals)
  const commit = await commitOf(root)
  const told = await asked({ root, home: requireEnv("HOME"), checks: narrowed.checks, commit })
  const also = [
    ...notAnAuditIn(leftOutOf(atAudit, narrowed.checks)),
    ...notYetJudgingIn(every, named),
  ]
  return askedAnswer({ told, checks: narrowed.checks.length, commit, also }, keeping)
}

export async function audit(argv: readonly string[], given: Given): Promise<Answer> {
  const meant = meaning(argv)
  if (meant.refusal !== null) return refusedBy([meant.refusal])
  const root = resolve(given.root)
  const page = given.agentId === null ? null : agentPathOf(root, given.agentId)
  const keeping: Keeping | null = page === null ? null : (whole) => refusalsPut(root, page, whole)
  try {
    return await askedOver(root, checksIn(root), meant.only, keeping)
  } catch (thrown) {
    return brokenBy(thrown)
  }
}
