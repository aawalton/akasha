import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { writeMessage } from "akasha/agent/messaging/modules/message-file/message-file.module.code.ts"
import { check as checkDomain } from "akasha/check/check.domain.ts"
import {
  costKept,
  type Recording,
  verdictSent,
} from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import {
  cleanAt,
  cleanly,
  measured,
  type Verdict,
  verdictLogged,
  verdictOver,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import {
  checksAt,
  checksIn,
  type Gathered,
  takesAny,
} from "akasha/check/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import { bytes, endingOf } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { domainsDrawn } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { textOnDisk } from "akasha/file/disk/modules/text-on-disk/text-on-disk.module.code.ts"
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
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const TURNS = ".local/state/workstation-services/audit-turns"

const WAITED = 3_600_000

const ANSWERS_FOR = `${domain.slug}/${checkDomain.slug}` as const

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

const WHOLE =
  "what each of them answered is on the newest row of the audit log beside that check's page."

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
      await costKept(one, done, began, said, AUDIT_LOGS)
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

const gated: Running = async (one, change) => {
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

async function overNow(root: string): Promise<Over> {
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
  readonly record?: Recording
}

export async function carriedOn(given: Asking, before: Verdict): Promise<Verdict | null> {
  if (before.unrun) return null
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

function verdictFor(given: Asking): Verdict | null {
  return verdictLogged(given.root, given.check.page, AUDIT_LOGS)
}

async function verdictPut(given: Asking, verdict: Verdict): Promise<undefined> {
  await verdictSent(given.check.page, given.check.slug, verdict, AUDIT_LOGS, given.record)
}

async function ranFor(given: Asking): Promise<Ran> {
  const run = given.run ?? gated
  const slug = given.check.slug
  const answered = async (): Promise<Verdict | null> => {
    const held = verdictFor(given)
    return (await cleanAt(given.root, held, given.asked)) ? held : null
  }
  const already = await answered()
  if (already !== null) return { check: slug, verdict: already, ran: false }
  mkdirSync(join(given.home, TURNS), { recursive: true })
  return await exclusively(
    turnAt(given.home, slug),
    async (): Promise<Ran> => {
      const taken = await answered()
      if (taken !== null) return { check: slug, verdict: taken, ran: false }
      const last = verdictFor(given)
      const carried = last === null ? null : await carriedOn(given, last)
      if (carried !== null) {
        await verdictPut(given, carried)
        return { check: slug, verdict: carried, ran: false }
      }
      const found = await run(given.check, given.over.change)
      const verdict = verdictOf(found, given.over, new Date().toISOString())
      if (verdictFor(given)?.commit !== verdict.commit) await verdictPut(given, verdict)
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

export function refusalsNew(before: Verdict | null, after: Verdict): readonly string[] {
  if (cleanly(after)) return []
  if (before === null) return after.refusals
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

export function bodyFor(red: readonly Ran[], commit: string): string {
  const refused = red.filter((one) => measured(one.verdict))
  const unmeasured = red.filter((one) => !measured(one.verdict))
  return [
    headFor(commit, refused.length, unmeasured.length),
    ...heldTo([...refused, ...unmeasured].flatMap(saidOf), BODY_CEILING),
    WHOLE,
  ].join("\n")
}

export type Serving = {
  readonly root: string
  readonly home: string
  readonly checks: readonly string[]
  readonly run?: Running
  readonly send?: Sent
  readonly to?: string
}

export function roundOver(
  every: readonly Gathered[],
  checks: readonly string[]
): readonly Gathered[] {
  if (checks.length === 0) return checksAt(every, AUDIT)
  const held = new Set(checks)
  return every.filter((one) => held.has(one.slug))
}

async function serving(given: Serving): Promise<Told> {
  const send = given.send ?? sending
  const over = await overNow(given.root)
  const shadow = shadowAsked(over.change)
  const moved = movedIn(given.root, over.commit)
  const ran: Ran[] = []
  const red: Ran[] = []
  for (const one of roundOver(checksIn(given.root), given.checks)) {
    const asking: Asking = { ...given, check: one, over, asked: over.commit, moved, shadow }
    const before = verdictFor(asking)
    const said = await auditOne(asking)
    ran.push(said)
    const fresh = refusalsNew(before, said.verdict)
    if (fresh.length > 0) red.push({ ...said, verdict: { ...said.verdict, refusals: fresh } })
  }
  const turned = red.map((one) => one.check)
  if (red.length === 0) return { ran, turned, refused: [] }
  const to = given.to ?? championOf(given.root)
  const why = await telling(send, to, bodyFor(red, over.commit))
  return { ran, turned, refused: why === null ? [] : [why] }
}

export async function roundNow(checks: readonly string[]): Promise<Told> {
  const told = await serving({ root: checkoutAt(), home: requireEnv("HOME"), checks })
  const red = told.ran.filter((one) => measured(one.verdict) && !cleanly(one.verdict)).length
  const nothing = told.ran.filter((one) => !measured(one.verdict)).length
  process.stdout.write(
    `${SAID} ${counted(told.ran.length, "audit")}, ${red} refusing, ${nothing} unmeasured\n`
  )
  for (const one of told.refused) process.stderr.write(`${SAID} ${one}\n`)
  return told
}
