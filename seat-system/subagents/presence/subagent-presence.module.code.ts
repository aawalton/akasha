import { closeSync, existsSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { everyOfType, listedAt, listedById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { partedIn } from "@akasha/pages/page-file-name"
import { valueAt } from "@akasha/pages/page-value"
import { supervisorsRootDir } from "@akasha/seat-system/supervisor-log-path"
import { textAt } from "@akasha/utils/narrow/text-at"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { landedMechanically } from "../../../commands/modules/mechanical-landing/mechanical-landing.module.code.ts"
import {
  dropReadings,
  SUBAGENT_MARK,
} from "../../../commands/modules/reading/reading.module.code.ts"
import { subagentPageInHistory } from "../../subagent-page-history/subagent-page-history.module.code.ts"

export const SUBAGENTS_AT = "seat-system/subagents/pages"

export const WRITING = "write"

export const TAKING = "take"

export const LOG_AT = "subagent-presence.log"

const CALLED_AS = "subagent-presence"

const SEAT = "seat"

const SUBAGENT = "subagent"

const ASSIGNMENT = "assignmentSlug"

const KIND = "dispatchedAs"

const ID = "id"

const SUFFIX = ".subagent.ts"

const TAKE_PAGE = "change-mechanical-file/remove-file-page"

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export type Went = { readonly went: true } | { readonly why: string }

const WENT: Went = { went: true }

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}${SUBAGENT_MARK}${own}`
}

export function pathOf(slug: string): string {
  return `${SUBAGENTS_AT}/${slug}${SUFFIX}`
}

export function logPathOf(seatId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), seatId, LOG_AT)
}

function loggingTo(seatId: string, baseDir: string | undefined): number | null {
  const at = logPathOf(seatId, baseDir)
  try {
    mkdirSync(dirname(at), { recursive: true })
    return openSync(at, "a")
  } catch {
    return null
  }
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function bodyOf(
  slug: string,
  seatName: string,
  assignmentSlug: string,
  dispatchedAs: string,
  agentId: string,
  id: string | null = null
): string {
  return [
    'import type { Subagent } from "../subagent.page-type.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    ...(id === null ? [] : [`  id: ${said(id)},`]),
    '  pageTypeSlug: "subagent",',
    '  type: "subagent",',
    `  slug: ${said(slug)},`,
    `  principalSeatName: ${said(seatName)},`,
    `  assignmentSlug: ${said(assignmentSlug)},`,
    `  dispatchedAs: ${said(dispatchedAs)},`,
    `  agentId: ${said(agentId)},`,
    "} as const satisfies Subagent",
    "",
  ].join("\n")
}

export function assignedTo(root: string, seatName: string): string | null {
  const at = seatPageIn(root, seatName)
  if (at === null) return null
  const value = valueAt(at, root)
  return value === null ? null : textAt(value, ASSIGNMENT)
}

export function seatNamedIn(root: string, seatId: string): string | null {
  const listed = listedById(root, seatId)
  if (listed === null) return null
  const named = partedIn(listed.path)
  if (named === null || named.sections.length > 0 || named.pageType !== SEAT) return null
  return named.slug
}

async function handed(
  root: string,
  changes: readonly FileChange[],
  message: string
): Promise<Went> {
  const answer = await landedMechanically(root, CALLED_AS, changes, message)
  if (answer.code === 0) return WENT
  const why = answer.refusals.join(" ").trim()
  if (why !== "") return { why }
  return { why: `the landing answered ${String(answer.code)} and said nothing` }
}

export async function wrote(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (existsSync(join(root, at))) return WENT
  const agentId = agentIdOf(seatId, own)
  const had = subagentPageInHistory(root, at, agentId)
  const held = had?.values ?? {}
  const assignmentSlug = assignedTo(root, seatName) ?? textAt(held, ASSIGNMENT)
  if (assignmentSlug === null) {
    return {
      why:
        `no assignment is stated for the ${seatName} seat, and a subagent's page states the` +
        ` assignment its seat states, so ${at} was not written`,
    }
  }
  const content = bodyOf(
    slug,
    seatName,
    assignmentSlug,
    textAt(held, KIND) ?? dispatchedAs,
    agentId,
    textAt(held, ID)
  )
  return await handed(
    root,
    [{ kind: "add", path: at, content }],
    had === null
      ? `${slug}: a subagent states the agent id it acts under`
      : `${slug}: a subagent resuming takes up the page it had`
  )
}

export function seatPageIn(root: string, seatName: string): string | null {
  return listedAt(root, SEAT, seatName)[0]?.path ?? null
}

export async function took(
  root: string,
  seatName: string,
  own: string,
  landing: Landing = runMechanicalChange
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (!existsSync(join(root, at))) return WENT
  const why = `${slug} is done, so its page goes; what it was is in this repository's history`
  const landed = await landing(root, [{ at: TAKE_PAGE, given: { at } }], why)
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return { why: wrong.join(" ").trim() }
  dropReadings(root, [at])
  return WENT
}

export function pathsUnder(root: string, seatName: string): readonly string[] {
  const mark = `${seatName}-`
  return everyOfType(root, SUBAGENT)
    .map((one) => one.path)
    .filter((one) => partedIn(one)?.slug.startsWith(mark) === true)
    .sort()
}

export async function tookUnder(root: string, seatName: string, why: string): Promise<Went> {
  const paths = pathsUnder(root, seatName)
  if (paths.length === 0) return WENT
  const gone = await handed(
    root,
    paths.map((path): FileChange => ({ kind: "remove", path })),
    `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`
  )
  if (!("why" in gone)) dropReadings(root, paths)
  return gone
}

export function asking(
  root: string,
  seatId: string,
  args: readonly string[],
  baseDir?: string
): undefined {
  const fd = loggingTo(seatId, baseDir)
  try {
    Bun.spawn([process.execPath, import.meta.path, root, ...args], {
      cwd: root,
      stdin: "ignore",
      stdout: fd ?? "ignore",
      stderr: fd ?? "ignore",
    }).unref()
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

export function puttingUp(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [WRITING, seatName, own, dispatchedAs, seatId], baseDir)
}

export function takingDown(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [TAKING, seatName, own], baseDir)
}

function padded(held: number, wide = 2): string {
  return String(held).padStart(wide, "0")
}

export function stampedAt(when: Date): string {
  const off = -when.getTimezoneOffset()
  const held = Math.abs(off)
  return (
    `${String(when.getFullYear())}-${padded(when.getMonth() + 1)}-${padded(when.getDate())}` +
    `T${padded(when.getHours())}:${padded(when.getMinutes())}:${padded(when.getSeconds())}` +
    `.${padded(when.getMilliseconds(), 3)}${off < 0 ? "-" : "+"}` +
    `${padded(Math.floor(held / 60))}:${padded(held % 60)}`
  )
}

export const LOCK_HELD = "akasha-landing.lock"

export const TRIES = 5

export const WAIT_MS = 30_000

export function worthAnotherTry(why: string): boolean {
  return why.includes(LOCK_HELD)
}

export async function sleeping(ms: number): Promise<void> {
  await Bun.sleep(ms)
}

export async function landingAgain(
  ask: () => Promise<Went>,
  waited: (ms: number) => Promise<void> = sleeping
): Promise<Went> {
  let went = await ask()
  for (let tried = 1; tried < TRIES && "why" in went && worthAnotherTry(went.why); tried += 1) {
    await waited(WAIT_MS)
    went = await ask()
  }
  return went
}

function saying(why: string): number {
  process.stderr.write(`${stampedAt(new Date())} ${CALLED_AS}: ${why}\n`)
  return 1
}

function answering(went: Went, at: string): number {
  return "why" in went ? saying(`${at} — ${went.why}`) : 0
}

export async function ran(argv: readonly string[]): Promise<number> {
  const root = argv[2]
  const act = argv[3]
  const seatName = argv[4]
  const own = argv[5]
  const dispatchedAs = argv[6]
  const seatId = argv[7]
  if (root === undefined || root === "") return saying("no root was named")
  if (act === undefined || act === "") return saying("no act was named")
  if (seatName === undefined || seatName === "") return saying(`${act}: no seat was named`)
  if (own === undefined || own === "") return saying(`${act} ${seatName}: no subagent id was named`)
  const at = `${act} ${seatName} ${own}`
  if (act === WRITING) {
    if (dispatchedAs === undefined || dispatchedAs === "")
      return saying(`${at} — no kind was named`)
    if (seatId === undefined || seatId === "") return saying(`${at} — no seat id was named`)
    const put = await landingAgain(() => wrote(root, seatName, seatId, own, dispatchedAs))
    return answering(put, at)
  }
  if (act === TAKING) return answering(await landingAgain(() => took(root, seatName, own)), at)
  return saying(`\`${act}\` is no act this takes`)
}

if (import.meta.main) {
  process.exit(await ran(Bun.argv))
}
