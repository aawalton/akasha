import { mkdirSync } from "node:fs"
import { join } from "node:path"
import {
  cleanAt,
  cleanly,
  type Verdict,
  verdictKept,
  verdictsRead,
  verdictsWrite,
} from "akasha/checks/modules/audit-verdict/audit-verdict.module.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  checksAt,
  checksIn,
  type Gathered,
  judgingBy,
} from "akasha/checks/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { exclusively } from "akasha/files/exclusive/exclusive.module.code.ts"
import { runGit } from "akasha/git/answering/git-answering.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { writeMessage } from "akasha/seat-system/messaging/message-file/message-file.module.code.ts"
import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const TURNS = ".local/state/workstation-services/audit-turns"

const WAITED = 3_600_000

const TO = "thea"

const FROM = "audit-running"

const AUDIT = "audit"

const SHOWN = 5

const SAID = "audit-running:"

const PARTED = "\n"

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

export const running: Running = async (one, change) =>
  await judgingBy([one], AUDIT, one.root).over(change)

export const sending: Sent = async (to, body) => {
  const wrote = await writeMessage({ to, from: FROM, warrant: "announce", body })
  return wrote.kind === "refused" ? wrote.detail : null
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
  return {
    commit: over.commit,
    ranAt: now,
    refusals: found.map((one) => `${one.path} — ${one.reason}`),
    unrun: found.some((one) => one.threw === true),
  }
}

export function turnAt(home: string, check: string): string {
  return join(home, TURNS, check)
}

export type Asking = {
  readonly root: string
  readonly home: string
  readonly check: Gathered
  readonly over: Over
  readonly asked: string
  readonly run?: Running
}

export function keyFor(given: Asking): string {
  return [given.home, given.check.slug, given.over.commit].join(PARTED)
}

async function ranFor(given: Asking): Promise<Ran> {
  const run = given.run ?? running
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

export function turnedRed(before: Verdict | undefined, after: Verdict): boolean {
  if (cleanly(after)) return false
  return before === undefined || cleanly(before)
}

export function bodyFor(red: readonly Ran[], commit: string): string {
  const said = red.flatMap((one) => [
    `\`${one.check}\` refused ${counted(one.verdict.refusals.length, "time")}:`,
    ...one.verdict.refusals.slice(0, SHOWN).map((two) => `  ${two}`),
  ])
  return [
    `the audit at ${commit} found ${counted(red.length, "check")} newly refusing.`,
    ...said,
    "`akasha audit --check <slug>` says what one of them refuses whole.",
  ].join("\n")
}

export type Serving = {
  readonly root: string
  readonly home: string
  readonly run?: Running
  readonly send?: Sent
}

export async function serving(given: Serving): Promise<Told> {
  const send = given.send ?? sending
  const over = await overNow(given.root)
  const ran: Ran[] = []
  const turned: string[] = []
  for (const one of checksAt(checksIn(given.root), AUDIT)) {
    const before = verdictsRead(given.home)[one.slug]
    const said = await auditOne({ ...given, check: one, over, asked: over.commit })
    ran.push(said)
    if (turnedRed(before, said.verdict)) turned.push(one.slug)
  }
  const red = ran.filter((one) => turned.includes(one.check))
  if (red.length === 0) return { ran, turned, refused: [] }
  const why = await send(TO, bodyFor(red, over.commit))
  return { ran, turned, refused: why === null ? [] : [why] }
}

if (import.meta.main) {
  const told = await serving({ root: checkoutAt(), home: requireEnv("HOME") })
  const red = told.ran.filter((one) => !cleanly(one.verdict)).length
  process.stdout.write(`${SAID} ${counted(told.ran.length, "audit")}, ${red} refusing\n`)
  for (const one of told.refused) process.stderr.write(`${SAID} nothing told thea: ${one}\n`)
  if (told.refused.length > 0) process.exit(1)
}
