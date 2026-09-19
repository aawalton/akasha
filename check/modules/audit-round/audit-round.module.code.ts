import {
  asked,
  type Verdicts,
  verdictsFor,
} from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import { sentToCluster } from "akasha/check/modules/audit-job/audit-job.module.code.ts"
import { verdictSent } from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import {
  bodyFor,
  carriedOn,
  championOf,
  movedIn,
  type Over,
  type Ran,
  refusalsNew,
  roundOver,
  type Sent,
  sending,
  telling,
} from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { atOrAfter } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
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

export type Underway = { readonly checks: ReadonlySet<string>; readonly told: Promise<Turned> }

const underway = new Map<string, readonly Underway[]>()

export type Split = { readonly joined: readonly Underway[]; readonly left: readonly string[] }

export function splitting(held: readonly Underway[], checks: readonly string[]): Split {
  const joined: Underway[] = []
  const left = new Set(checks)
  for (const one of held) {
    const covers = checks.filter((each) => left.has(each) && one.checks.has(each))
    if (covers.length === 0) continue
    joined.push(one)
    for (const each of covers) left.delete(each)
    if (left.size === 0) break
  }
  return { joined, left: checks.filter((one) => left.has(one)) }
}

export function merged(told: readonly Turned[], checks: readonly string[]): Turned {
  const want = new Set(checks)
  const ran = new Map<string, Ran>()
  for (const one of told) {
    for (const each of one.ran) {
      if (want.has(each.check) && !ran.has(each.check)) ran.set(each.check, each)
    }
  }
  const turned = told.flatMap((one) => one.turned.filter((each) => want.has(each)))
  return {
    ran: [...ran.values()],
    turned: [...new Set(turned)],
    refused: [...new Set(told.flatMap((one) => one.refused))],
  }
}

function without(commit: string, mine: Underway): undefined {
  const now = (underway.get(commit) ?? []).filter((one) => one !== mine)
  if (now.length === 0) underway.delete(commit)
  else underway.set(commit, now)
}

export type Rounds = ReadonlyMap<string, readonly Underway[]>

export type After = (root: string, commit: string, ran: string) => Promise<boolean>

export async function satisfying(
  root: string,
  commit: string,
  rounds: Rounds,
  after: After = atOrAfter
): Promise<readonly Underway[]> {
  const found: Underway[] = []
  for (const [at, held] of rounds) {
    if (await after(root, commit, at)) found.push(...held)
  }
  return found
}

export type Waiting = {
  readonly checks: readonly string[]
  readonly commit: string
  readonly told: Promise<Turned>
  readonly settle: (turned: Turned) => undefined
  readonly broke: (why: unknown) => undefined
}

const PENDING: Waiting[] = []

let turning: Promise<undefined> | null = null

export async function latestOf(
  root: string,
  commits: readonly string[],
  after: After = atOrAfter
): Promise<string> {
  const each = [...new Set(commits)]
  let latest = each[0] ?? ""
  let most = -1
  for (const one of each) {
    let held = 0
    for (const two of each) if (await after(root, two, one)) held += 1
    if (held > most) {
      latest = one
      most = held
    }
  }
  return latest
}

export type Taken = { readonly now: readonly Waiting[]; readonly later: readonly Waiting[] }

export async function answeredBy(
  root: string,
  at: string,
  held: readonly Waiting[],
  after: After = atOrAfter
): Promise<Taken> {
  const now: Waiting[] = []
  const later: Waiting[] = []
  for (const one of held) {
    if (await after(root, one.commit, at)) now.push(one)
    else later.push(one)
  }
  return { now, later }
}

async function turnedOver(
  root: string,
  taken: readonly Waiting[],
  send: Sent,
  to: string | null
): Promise<undefined> {
  const at = await latestOf(
    root,
    taken.map((one) => one.commit)
  )
  const split = await answeredBy(root, at, taken)
  PENDING.push(...split.later)
  const checks = [...new Set(split.now.flatMap((one) => one.checks))]
  const told = roundTold(root, checks, at, send, to)
  const mine: Underway = { checks: new Set(checks), told }
  underway.set(at, [...(underway.get(at) ?? []), mine])
  try {
    const turned = await told
    for (const one of split.now) one.settle(turned)
  } catch (thrown) {
    for (const one of split.now) one.broke(thrown)
  } finally {
    without(at, mine)
  }
}

async function turningOn(root: string, send: Sent, to: string | null): Promise<undefined> {
  for (;;) {
    const taken = PENDING.splice(0, PENDING.length)
    if (taken.length === 0) {
      turning = null
      return
    }
    await turnedOver(root, taken, send, to)
  }
}

function queued(
  root: string,
  checks: readonly string[],
  commit: string,
  send: Sent,
  to: string | null
): Promise<Turned> {
  let settle: (turned: Turned) => undefined = () => undefined
  let broke: (why: unknown) => undefined = () => undefined
  const told = new Promise<Turned>((keep, drop) => {
    settle = (turned) => {
      keep(turned)
      return undefined
    }
    broke = (why) => {
      drop(why)
      return undefined
    }
  })
  PENDING.push({ checks, commit, told, settle, broke })
  if (turning === null) turning = turningOn(root, send, to)
  return told
}

export async function roundJoined(
  root: string,
  named: readonly string[],
  commit: string,
  send: Sent = sending,
  to: string | null = null
): Promise<Turned> {
  const checks = roundOver(checksIn(root), named).map((one) => one.slug)
  const split = splitting(await satisfying(root, commit, underway), checks)
  const waited = split.joined.map((one) => one.told)
  if (split.left.length === 0) return merged(await Promise.all(waited), checks)
  const mine = queued(root, split.left, commit, send, to)
  return merged(await Promise.all([...waited, mine]), checks)
}

export async function roundTold(
  root: string,
  named: readonly string[],
  commit: string,
  send: Sent = sending,
  to: string | null = null
): Promise<Turned> {
  const gathered = roundOver(checksIn(root), named)
  const checks = gathered.map((one) => one.slug)
  const before = verdictsFor(root, checks)
  await carriedForward(root, commit, gathered, before)
  const told = await asked({ root, checks, commit, round: sentToCluster(root, commit) })
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
