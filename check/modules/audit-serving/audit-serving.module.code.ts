import { mkdirSync } from "node:fs"
import { join } from "node:path"
import {
  costKept,
  type Recording,
  verdictSent,
} from "akasha/check/modules/audit-recording/audit-recording.module.code.ts"
import {
  bodyFor,
  championOf,
  refusalPath,
  refusalsNew,
  type Sent,
  sending,
  telling,
} from "akasha/check/modules/audit-telling/audit-telling.module.code.ts"
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
import { reasonSaid } from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import {
  bytesAwaited,
  endingOf,
  processorsHere,
} from "akasha/code/spawning/modules/running/running.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { textOnDisk } from "akasha/file/disk/modules/text-on-disk/text-on-disk.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
import { waitedForRoom } from "akasha/infrastructure/kernel/modules/landing-admission/landing-admission.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const TURNS = ".local/state/workstation-services/audit-turns"

const WAITED = 3_600_000

const ALONE = 1

const AUDIT = "audit"

const LOGS = "logs"

const AUDIT_LOGS = `${AUDIT}.${LOGS}`

const SAID = "audit-running:"

const PARTED = "\n"

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
    const done = await bytesAwaited([BUN, childAt(one.root), one.root, one.slug, at], {
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

function saidOfItself(one: Gathered, verdict: Verdict): boolean {
  return verdict.refusals.some((two) => refusalPath(two) === one.page)
}

export type Serving = {
  readonly root: string
  readonly home: string
  readonly checks: readonly string[]
  readonly run?: Running
  readonly send?: Sent
  readonly to?: string
  readonly record?: Recording
}

export function roundOver(
  every: readonly Gathered[],
  checks: readonly string[]
): readonly Gathered[] {
  if (checks.length === 0) return checksAt(every, AUDIT)
  const held = new Set(checks)
  return every.filter((one) => held.has(one.slug))
}

export async function aloneOver(
  given: Serving,
  over: Over,
  every: readonly Gathered[],
  ran: readonly Ran[]
): Promise<ReadonlyMap<number, Ran>> {
  const made = new Map<number, Ran>()
  mkdirSync(join(given.home, TURNS), { recursive: true })
  for (let mine = 0; mine < every.length; mine += 1) {
    const one = every[mine]
    const said = ran[mine]
    if (one === undefined || said === undefined || !said.ran) continue
    if (!saidOfItself(one, said.verdict)) continue
    const verdict = await exclusively(
      turnAt(given.home, one.slug),
      async (): Promise<Verdict> => {
        const again = await (given.run ?? gated)(one, over.change)
        const now = verdictOf(again, over, new Date().toISOString())
        await verdictSent(one.page, one.slug, now, AUDIT_LOGS, given.record)
        return now
      },
      WAITED
    )
    made.set(mine, { check: one.slug, verdict, ran: true })
  }
  return made
}

async function serving(given: Serving): Promise<Told> {
  const send = given.send ?? sending
  const over = await overNow(given.root)
  const shadow = shadowAsked(over.change)
  const moved = movedIn(given.root, over.commit)
  const every = roundOver(checksIn(given.root), given.checks)
  const ran: Ran[] = []
  const found: (Ran | undefined)[] = []
  const was: (Verdict | null)[] = []
  const keeping = (mine: number, said: Ran): undefined => {
    ran[mine] = said
    const fresh = refusalsNew(was[mine] ?? null, said.verdict)
    found[mine] =
      fresh.length > 0 ? { ...said, verdict: { ...said.verdict, refusals: fresh } } : undefined
  }
  let next = 0
  const turn = async (): Promise<undefined> => {
    for (;;) {
      const mine = next
      next += 1
      const one = every[mine]
      if (one === undefined) return
      const asking: Asking = { ...given, check: one, over, asked: over.commit, moved, shadow }
      was[mine] = verdictFor(asking)
      keeping(mine, await auditOne(asking))
    }
  }
  const turns: Promise<undefined>[] = []
  const lanes = Math.max(ALONE, Math.min(processorsHere() ?? ALONE, every.length))
  for (let which = 0; which < lanes; which += 1) turns.push(turn())
  await Promise.all(turns)
  for (const [mine, said] of await aloneOver(given, over, every, ran)) keeping(mine, said)
  const red = found.flatMap((one) => (one === undefined ? [] : [one]))
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
