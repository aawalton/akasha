import {
  asked,
  type Verdicts,
  verdictsFor,
} from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import { roundFor } from "akasha/check/modules/audit-job/audit-job.module.code.ts"
import { verdictSent } from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import {
  bodyFor,
  carriedOn,
  championOf,
  commitOf,
  movedIn,
  type Over,
  type Ran,
  refusalsNew,
  roundOver,
  type Sent,
  sending,
  telling,
} from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { checksIn, type Gathered } from "akasha/check/modules/checking/checking.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AUDIT_LOGS = "audit.logs"

const HOME = "HOME"

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

export function owedCarrying(
  gathered: readonly Gathered[],
  held: Verdicts,
  commit: string
): readonly Gathered[] {
  return gathered.filter((one) => {
    const verdict = held.get(one.slug)
    return verdict !== undefined && verdict.commit !== commit
  })
}

export async function carriedForward(
  root: string,
  commit: string,
  gathered: readonly Gathered[],
  held: Verdicts
): Promise<readonly string[]> {
  const owed = owedCarrying(gathered, held, commit)
  if (owed.length === 0) return []
  const over: Over = { change: everythingIn(root), commit }
  const asking = {
    root,
    home: requireEnv(HOME),
    over,
    asked: commit,
    moved: movedIn(root, commit),
    shadow: shadowAsked(over.change),
  }
  const carried: string[] = []
  for (const one of owed) {
    const last = held.get(one.slug)
    if (last === undefined) continue
    const said = await carriedOn({ ...asking, check: one }, last)
    if (said === null) continue
    await verdictSent(one.page, one.slug, said, AUDIT_LOGS)
    carried.push(one.slug)
  }
  return carried
}

export async function roundTold(
  root: string,
  named: readonly string[] = [],
  send: Sent = sending,
  to: string | null = null
): Promise<Turned> {
  const commit = await commitOf(root)
  const gathered = roundOver(checksIn(root), named)
  const checks = gathered.map((one) => one.slug)
  const before = verdictsFor(root, checks)
  await carriedForward(root, commit, gathered, before)
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
