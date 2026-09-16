import {
  asked,
  type Verdicts,
  verdictsFor,
} from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import { roundFor } from "akasha/check/modules/audit-job/audit-job.module.code.ts"
import {
  bodyFor,
  championOf,
  commitOf,
  type Ran,
  refusalsNew,
  type Sent,
  sending,
  telling,
} from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { checksAt, checksIn } from "akasha/check/modules/checking/checking.module.code.ts"

const AUDIT = "audit"

export type Turned = {
  readonly ran: readonly Ran[]
  readonly turned: readonly string[]
  readonly refused: readonly string[]
}

export function answeredIn(checks: readonly string[], held: Verdicts): readonly Ran[] {
  return checks.flatMap((one) => {
    const verdict = held.get(one)
    return verdict === undefined ? [] : [{ check: one, verdict, ran: true }]
  })
}

export function turnedIn(
  checks: readonly string[],
  before: Verdicts,
  after: Verdicts
): readonly Ran[] {
  const red: Ran[] = []
  for (const one of checks) {
    const verdict = after.get(one)
    if (verdict === undefined) continue
    const fresh = refusalsNew(before.get(one) ?? null, verdict)
    if (fresh.length > 0) {
      red.push({ check: one, verdict: { ...verdict, refusals: fresh }, ran: true })
    }
  }
  return red
}

export async function roundTold(
  root: string,
  send: Sent = sending,
  to: string | null = null
): Promise<Turned> {
  const commit = await commitOf(root)
  const checks = checksAt(checksIn(root), AUDIT).map((one) => one.slug)
  const before = verdictsFor(root, checks)
  const told = await asked({ root, checks, commit, round: roundFor(root, commit) })
  const after = verdictsFor(root, checks)
  const refused = told.broken === null ? [] : [told.broken]
  const ran = answeredIn(checks, after)
  const red = turnedIn(checks, before, after)
  if (red.length === 0) return { ran, turned: [], refused }
  const why = await telling(send, to ?? championOf(root), bodyFor(red, commit))
  return {
    ran,
    turned: red.map((one) => one.check),
    refused: why === null ? refused : [...refused, why],
  }
}
