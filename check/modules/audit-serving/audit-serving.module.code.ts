import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { writeMessage } from "akasha/agent/messaging/modules/message-file/message-file.module.code.ts"
import {
  requestDone,
  requestsIn,
} from "akasha/check/modules/audit-request/audit-request.module.code.ts"
import {
  cleanAt,
  cleanly,
  commitHeld,
  measured,
  type Verdict,
  verdictKept,
  verdictOver,
  verdictRecorded,
  verdictsAt,
  verdictsRead,
  verdictsWrite,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  checksAt,
  checksIn,
  type Gathered,
  takesAny,
} from "akasha/check/modules/checking/checking.module.code.ts"
import { costSpawned } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { domainsDrawn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
import { waitedForRoom } from "akasha/infrastructure/kernel/modules/landing-admission/landing-admission.module.code.ts"
import {
  championing,
  passedOn,
} from "akasha/infrastructure/service/workstation/modules/service-alerting/service-alerting.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"
import { textOnDisk } from "akasha/util/fs/modules/text-on-disk/text-on-disk.module.code.ts"
import { requireEnv } from "akasha/util/narrow/modules/require-env/require-env.module.code.ts"
import { saidBy } from "akasha/util/narrow/modules/said-by/said-by.module.code.ts"
import { bytes, endingOf, type Held } from "akasha/util/run/modules/running/running.module.code.ts"
import { counted } from "akasha/util/text/modules/counted/counted.module.code.ts"

const TURNS = ".local/state/workstation-services/audit-turns"

const WAITED = 3_600_000

const ANSWERS_FOR = "domain/check"

const FALLBACK = "alan"

const FROM = "audit-running"

const AUDIT = "audit"

const LOGS = "logs"

const AUDIT_LOGS = `${AUDIT}.${LOGS}`

const SHOWN = 5

const BODY_CEILING = 19000

const REASON_CEILING = 240

const SAID = "audit-running:"

const PARTED = "\n"

const REASONED = " — "

const BUN = "bun"

const MODULE = "module"

const CHILD = "audit-child"

const CODE = "code"

const TS = "ts"

const SCRATCH = "akasha-audit-child-"

const ANSWERED = "judged.json"

const STDERR_CEILING = 800

const UNANSWERED = "wrote no verdict where one was asked for"

const UNREAD = "wrote a verdict no runner could read"

const UNMEASURED = "went unmeasured"

const REFUSING = "newly refusing"

const NOTHING_MEASURED = "nothing measured"

const WHOLE = "holds what each of them answered, whole."

const underway = new Map<string, Promise<Ran>>()

export type Over = {
  readonly change: Change
  readonly commit: string
}

export type Ran = {
  readonly check: string
  readonly verdict: Verdict
  readonly ran: boolean
}

export type Running = (one: Gathered, change: Change) => Promise<readonly Judged[]>

export type Sent = (to: string, body: string) => Promise<string | null>

export type Told = {
  readonly ran: readonly Ran[]
  readonly turned: readonly string[]
  readonly refused: readonly string[]
}

export function childAt(root: string): string {
  const page = listedAt(root, MODULE, CHILD)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${CHILD}\`, so no check would run apart`)
  }
  return join(root, at)
}

function unrun(one: Gathered, why: string): readonly Judged[] {
  return [{ path: one.page, reason: `the check \`${one.slug}\` ${why}`, threw: true }]
}

function judgedRow(one: unknown): one is Judged {
  if (one === null || typeof one !== "object") return false
  const said = one as Judged
  return typeof said.path === "string" && typeof said.reason === "string"
}

export function judgedIn(text: string): readonly Judged[] | null {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return null
  }
  if (!Array.isArray(held)) return null
  const said: readonly unknown[] = held
  return said.every(judgedRow) ? (said as readonly Judged[]) : null
}

function costKept(one: Gathered, done: Held, began: number, said: readonly Judged[]): undefined {
  const ranAt = new Date(began).toISOString()
  const cost = costSpawned({
    runId: Bun.randomUUIDv7(),
    ranAt,
    phase: AUDIT,
    ran: one.slug,
    wallMs: Date.now() - began,
    cpuSeconds: done.cpuSeconds,
    peakBytes: done.peakBytes,
    peakMeasured: done.peakMeasured,
    refusals: said.length,
  })
  const verdict = verdictOver(said, commitHeld(one.root), ranAt)
  verdictRecorded(one.root, one.page, cost, verdict, AUDIT_LOGS)
}

export const spawning: Running = async (one) => {
  const scratch = scratchWorld()
  try {
    const at = join(scratch.rootFor(SCRATCH), ANSWERED)
    const cpu = one.auditCeiling ?? null
    const memory = one.auditMemoryMb ?? null
    const began = Date.now()
    const done = bytes([BUN, childAt(one.root), one.root, one.slug, at], {
      cwd: one.root,
      metered: true,
      ...(cpu === null ? {} : { cpuCeiling: cpu }),
      ...(memory === null ? {} : { memoryCeiling: memory }),
    })
    const ending = endingOf(done.code, done.signal)
    if (done.code !== 0 || done.signal !== null) {
      const why = reasonSaid(done.err, STDERR_CEILING)
      const said = unrun(one, `${ending} apart, so it judged nothing — ${why}`)
      costKept(one, done, began, said)
      return said
    }
    const text = textOnDisk(at)
    if (text === null) return unrun(one, `${ending} and ${UNANSWERED}`)
    return judgedIn(text) ?? unrun(one, `${UNREAD} — ${counted(text.length, "character")} of it`)
  } catch (thrown) {
    return unrun(one, `could not be run apart — ${saidBy(thrown)}`)
  } finally {
    scratch.sweep()
  }
}

export const gated: Running = async (one, change) => {
  await waitedForRoom(AUDIT)
  return await spawning(one, change)
}

export const sending: Sent = async (to, body) => {
  const wrote = await writeMessage({ to, from: FROM, warrant: "announce", body })
  return wrote.kind === "refused" ? wrote.detail : null
}

export function championOf(root: string): string {
  return championing(domainsDrawn(root))(ANSWERS_FOR) ?? FALLBACK
}

export async function telling(send: Sent, to: string, body: string): Promise<string | null> {
  const why = await send(to, body)
  if (why === null) return null
  if (to === FALLBACK) return `nothing told \`${FALLBACK}\`: ${why}`
  const then = await send(FALLBACK, passedOn(to, body, why))
  return then === null ? null : `nothing told \`${to}\` or \`${FALLBACK}\`: ${then}`
}

export async function commitOf(root: string): Promise<string> {
  const found = await runGit(["rev-parse", "HEAD"], root)
  if (found.ok) return found.stdout
  throw new Error(`${SAID} the commit an audit would answer for could not be read: ${found.stderr}`)
}

export async function overNow(root: string): Promise<Over> {
  const commit = await commitOf(root)
  return { change: everythingIn(root), commit }
}

export function verdictOf(found: readonly Judged[], over: Over, now: string): Verdict {
  return verdictOver(found, over.commit, now)
}

export function turnAt(home: string, check: string): string {
  return join(home, TURNS, check)
}

export type Moved = (since: string) => Promise<readonly string[] | null>

export function movedIn(root: string, commit: string): Moved {
  const held = new Map<string, readonly string[] | null>()
  return async (since) => {
    const found = held.get(since)
    if (found !== undefined) return found
    const ran = await runGit(["diff", "--name-only", since, commit], root)
    const said = ran.ok ? ran.stdout.split("\n").filter((one) => one !== "") : null
    held.set(since, said)
    return said
  }
}

export type Asking = {
  readonly root: string
  readonly home: string
  readonly check: Gathered
  readonly over: Over
  readonly asked: string
  readonly run?: Running
  readonly moved?: Moved
  readonly shadow?: Shadow
}

export async function carriedOn(given: Asking, before: Verdict): Promise<Verdict | null> {
  const moved = given.moved
  const shadow = given.shadow
  if (moved === undefined || shadow === undefined) return null
  if (before.commit === given.over.commit) return before
  const since = await moved(before.commit)
  if (since === null || takesAny(given.check, since, shadow)) return null
  return { ...before, commit: given.over.commit }
}

export function keyFor(given: Asking): string {
  return [given.home, given.check.slug, given.over.commit].join(PARTED)
}

async function ranFor(given: Asking): Promise<Ran> {
  const run = given.run ?? gated
  const slug = given.check.slug
  const answered = async (): Promise<Verdict | null> => {
    const verdicts = verdictsRead(given.home)
    const held = verdicts[slug]
    if (held === undefined) return null
    return (await cleanAt(given.root, verdicts, slug, given.asked)) ? held : null
  }
  const already = await answered()
  if (already !== null) return { check: slug, verdict: already, ran: false }
  mkdirSync(join(given.home, TURNS), { recursive: true })
  return await exclusively(
    turnAt(given.home, slug),
    async (): Promise<Ran> => {
      const taken = await answered()
      if (taken !== null) return { check: slug, verdict: taken, ran: false }
      const last = verdictsRead(given.home)[slug]
      const carried = last === undefined ? null : await carriedOn(given, last)
      if (carried !== null) {
        verdictsWrite(given.home, verdictKept(verdictsRead(given.home), slug, carried))
        return { check: slug, verdict: carried, ran: false }
      }
      const found = await run(given.check, given.over.change)
      const verdict = verdictOf(found, given.over, new Date().toISOString())
      verdictsWrite(given.home, verdictKept(verdictsRead(given.home), slug, verdict))
      return { check: slug, verdict, ran: true }
    },
    WAITED
  )
}

export async function auditOne(given: Asking): Promise<Ran> {
  const key = keyFor(given)
  const joined = underway.get(key)
  if (joined !== undefined) return await joined
  const mine = ranFor(given)
  underway.set(key, mine)
  try {
    return await mine
  } finally {
    underway.delete(key)
  }
}

function refusalPath(said: string): string {
  const at = said.indexOf(REASONED)
  return at === -1 ? said : said.slice(0, at)
}

export function refusalsNew(before: Verdict | undefined, after: Verdict): readonly string[] {
  if (cleanly(after)) return []
  if (before === undefined) return after.refusals
  const had = new Set(before.refusals.map(refusalPath))
  return after.refusals.filter((one) => !had.has(refusalPath(one)))
}

function headFor(commit: string, refused: number, unmeasured: number): string {
  const found = `the audit at ${commit} found`
  if (unmeasured === 0) return `${found} ${counted(refused, "check")} ${REFUSING}.`
  if (refused === 0) return `${found} ${counted(unmeasured, "check")} ${NOTHING_MEASURED}.`
  return (
    `${found} ${counted(refused, "check")} ${REFUSING} and ` +
    `${counted(unmeasured, "check")} ${NOTHING_MEASURED}.`
  )
}

function saidOf(one: Ran): readonly string[] {
  const head = measured(one.verdict)
    ? `\`${one.check}\` refused ${counted(one.verdict.refusals.length, "time")}:`
    : `\`${one.check}\` ${UNMEASURED}:`
  return [
    head,
    ...one.verdict.refusals.slice(0, SHOWN).map((two) => `  ${reasonSaid(two, REASON_CEILING)}`),
  ]
}

export function bodyFor(red: readonly Ran[], commit: string, home: string): string {
  const refused = red.filter((one) => measured(one.verdict))
  const unmeasured = red.filter((one) => !measured(one.verdict))
  return [
    headFor(commit, refused.length, unmeasured.length),
    ...heldTo([...refused, ...unmeasured].flatMap(saidOf), BODY_CEILING),
    `${verdictsAt(home)} ${WHOLE}`,
  ].join("\n")
}

export type Serving = {
  readonly root: string
  readonly home: string
  readonly run?: Running
  readonly send?: Sent
  readonly to?: string
}

export function roundOver(
  every: readonly Gathered[],
  asked: readonly string[]
): readonly Gathered[] {
  if (asked.length === 0) return checksAt(every, AUDIT)
  const held = new Set(asked)
  return every.filter((one) => held.has(one.slug))
}

export async function serving(given: Serving): Promise<Told> {
  const send = given.send ?? sending
  const over = await overNow(given.root)
  const shadow = shadowAsked(over.change)
  const moved = movedIn(given.root, over.commit)
  const asked = requestsIn(given.home)
  const ran: Ran[] = []
  const red: Ran[] = []
  for (const one of roundOver(checksIn(given.root), asked)) {
    const before = verdictsRead(given.home)[one.slug]
    const said = await auditOne({
      ...given,
      check: one,
      over,
      asked: over.commit,
      moved,
      shadow,
    })
    ran.push(said)
    const fresh = refusalsNew(before, said.verdict)
    if (fresh.length > 0) red.push({ ...said, verdict: { ...said.verdict, refusals: fresh } })
  }
  for (const one of asked) requestDone(given.home, one)
  const turned = red.map((one) => one.check)
  if (red.length === 0) return { ran, turned, refused: [] }
  const to = given.to ?? championOf(given.root)
  const why = await telling(send, to, bodyFor(red, over.commit, given.home))
  return { ran, turned, refused: why === null ? [] : [why] }
}

export async function runAuditServing(): Promise<void> {
  const told = await serving({ root: checkoutAt(), home: requireEnv("HOME") })
  const red = told.ran.filter((one) => measured(one.verdict) && !cleanly(one.verdict)).length
  const nothing = told.ran.filter((one) => !measured(one.verdict)).length
  process.stdout.write(
    `${SAID} ${counted(told.ran.length, "audit")}, ${red} refusing, ${nothing} unmeasured\n`
  )
  for (const one of told.refused) process.stderr.write(`${SAID} ${one}\n`)
}

if (import.meta.main) await runAuditServing()
