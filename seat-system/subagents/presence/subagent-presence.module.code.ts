import { closeSync, existsSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { dropReadings, SUBAGENT_MARK } from "akasha/agents/read-record/read-record.module.code.ts"
import { editsWaiting } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { createSubagentReader } from "akasha/code/editor/extension/subagent-reading/subagent-reading.module.code.ts"
import { importedFrom } from "akasha/pages/body/page-body.module.code.ts"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { exportedAs, typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  everyOfType,
  listedAt,
  listedById,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { pagesAtFor } from "akasha/pages/service/page-composing/page-composing.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { transcriptOf } from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { subagentPageInHistory } from "akasha/seat-system/subagent-page-history/subagent-page-history.module.code.ts"
import { movedOnto } from "akasha/seat-system/subagent-recovering/subagent-recovering.module.code.ts"
import {
  landingAgain,
  type Went,
} from "akasha/seat-system/subagents/landing-again/subagent-landing-again.module.code.ts"
import { subagentStarted } from "akasha/seat-system/subagents/properties/subagent-started.number-property.ts"
import { supervisorsRootDir } from "akasha/seat-system/supervisor-log-path/supervisor-log-path.module.code.ts"
import { asNumber } from "akasha/utils/narrow/as-number/as-number.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

export const WRITING = "write"

export const TAKING = "take"

export const SWEEPING = "sweep"

export const LOG_AT = "subagent-presence.log"

const CALLED_AS = "subagent-presence"

const SEAT = "seat"

const SUBAGENT = "subagent"

const ASSIGNMENT = "assignmentSlug"

const KIND = "dispatchedAs"

const ID = "id"

const AGENT_ID = "agentId"

const SUFFIX = ".subagent.ts"

const PAGE_TYPE = "page-type"

const TYPES = "types"

const TS = "ts"

const ADD_PAGE = "change-mechanical/add-file-of-any-kind"

const TAKE_PAGE = "change-mechanical-file/remove-file-page"

const STARTED = subagentStarted.propertySlug

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

const WENT: Went = { went: true }

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}${SUBAGENT_MARK}${own}`
}

export function subagentsAt(root: string = ownRepoRoot()): string {
  return pagesAtFor(root, SUBAGENT)
}

export function pathOf(slug: string): string {
  return `${subagentsAt()}/${slug}/${slug}${SUFFIX}`
}

export function pathIn(root: string, slug: string): string {
  const flat = `${subagentsAt()}/${slug}${SUFFIX}`
  return existsSync(join(root, flat)) ? flat : pathOf(slug)
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

function typeLineFor(root: string): string {
  const page = listedAt(root, PAGE_TYPE, SUBAGENT)[0]
  const at = page === undefined ? null : besideAt(page.path, TYPES, TS)
  if (at === null) throw new Error(`no \`${PAGE_TYPE}\` is slugged \`${SUBAGENT}\``)
  return `import type { ${typedAs(SUBAGENT)} } from "${importedFrom(at)}"`
}

export function bodyOf(
  slug: string,
  seatName: string,
  assignmentSlug: string,
  dispatchedAs: string,
  agentId: string,
  id: string | null = null,
  root: string = ownRepoRoot()
): string {
  return [
    typeLineFor(root),
    "",
    `export const ${exportedAs(slug)} = {`,
    ...(id === null ? [] : [`  id: ${said(id)},`]),
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

function wentBy(landed: Awaited<ReturnType<Landing>>): Went {
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  return wrong.length > 0 ? { why: wrong.join(" ").trim() } : WENT
}

export async function wrote(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string | null,
  landing: Landing = runMechanicalChange
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathIn(root, slug)
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
  const kind = textAt(held, KIND) ?? dispatchedAs
  if (kind === null) {
    return {
      why:
        `no kind is named for ${slug} and no page in history states the kind it was dispatched` +
        ` as, so ${at} was not written`,
    }
  }
  const content = bodyOf(slug, seatName, assignmentSlug, kind, agentId, textAt(held, ID))
  return wentBy(
    await landing(
      root,
      [{ at: ADD_PAGE, given: { at, body: content } }],
      had === null
        ? `${slug}: a subagent states the agent id it acts under`
        : `${slug}: a subagent resuming takes up the page it had`
    )
  )
}

export function seatPageIn(root: string, seatName: string): string | null {
  return listedAt(root, SEAT, seatName)[0]?.path ?? null
}

export function startedIn(root: string, page: string, startedAt: number | null): undefined {
  if (startedAt === null || !existsSync(join(root, page))) return
  mergeUncommitted(root, page, { [STARTED]: startedAt })
}

export function startedAfter(root: string, page: string, stoppedAt: number | null): boolean {
  if (stoppedAt === null) return false
  const held = asNumber(uncommittedIn(root, page)?.[STARTED])
  return held !== null && held > stoppedAt
}

export async function stillWorking(root: string, page: string, own: string): Promise<boolean> {
  try {
    const value = valueAt(page, root)
    const agentId = value === null ? null : textAt(value, AGENT_ID)
    if (agentId === null) return false
    const mark = agentId.indexOf(SUBAGENT_MARK)
    if (mark <= 0) return false
    const seatId = agentId.slice(0, mark)
    const named = transcriptOf(seatId)?.value
    if (named === undefined || named === "") return false
    const running = await createSubagentReader().forSeat(seatId, named)
    return running.some((one) => one.agentId === own)
  } catch {
    return false
  }
}

export function leftWhereItIs(root: string, seatName: string, at: string): string | null {
  if (seatPageIn(root, seatName) !== null) return null
  if (!editsWaiting(root, at)) return null
  return (
    `the index files no page for the ${seatName} seat to move onto, and ${at} has edits waiting` +
    ` that its take-down would take away, so that page was left where it is`
  )
}

export function movingOff(root: string, seatName: string, at: string): Went {
  const why = leftWhereItIs(root, seatName, at)
  if (why !== null) return { why }
  const seat = seatPageIn(root, seatName)
  if (seat !== null) movedOnto(root, seat, at)
  return WENT
}

export async function took(
  root: string,
  seatName: string,
  own: string,
  landing: Landing = runMechanicalChange,
  stoppedAt: number | null = null
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathIn(root, slug)
  if (!existsSync(join(root, at))) return WENT
  if (startedAfter(root, at, stoppedAt)) return WENT
  if (await stillWorking(root, at, own)) return WENT
  const moved = movingOff(root, seatName, at)
  if ("why" in moved) return moved
  const why = `${slug} is done, so its page goes; what it was is in this repository's history`
  return wentBy(await landing(root, [{ at: TAKE_PAGE, given: { at } }], why))
}

export function pathsUnder(root: string, seatName: string): readonly string[] {
  const mark = `${seatName}-`
  return everyOfType(root, SUBAGENT)
    .map((one) => one.path)
    .filter((one) => partedIn(one)?.slug.startsWith(mark) === true)
    .sort()
}

export async function tookUnder(
  root: string,
  seatName: string,
  why: string,
  landing: Landing = runMechanicalChange
): Promise<Went> {
  const paths = pathsUnder(root, seatName)
  if (paths.length === 0) return WENT
  const seat = seatPageIn(root, seatName)
  if (seat !== null) for (const at of paths) movedOnto(root, seat, at)
  const gone = wentBy(
    await landing(
      root,
      paths.map((at): Asking => ({ at: TAKE_PAGE, given: { at } })),
      `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`
    )
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
  asking(root, seatId, [WRITING, seatName, own, dispatchedAs, seatId, String(Date.now())], baseDir)
}

export function takingDown(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [TAKING, seatName, own, String(Date.now())], baseDir)
}

export function sweeping(
  root: string,
  seatName: string,
  seatId: string,
  why: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [SWEEPING, seatName, why], baseDir)
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

export function lineFor(why: string): string {
  return `${CALLED_AS}: ${why}`
}

function saying(why: string): number {
  process.stderr.write(`${stampedAt(new Date())} ${lineFor(why)}\n`)
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
  if (act === SWEEPING) {
    const why = own
    if (why === undefined || why === "") return saying(`${act} ${seatName}: no reason was named`)
    const swept = await landingAgain(() => tookUnder(root, seatName, why))
    return answering(swept, `${act} ${seatName}`)
  }
  if (own === undefined || own === "") return saying(`${act} ${seatName}: no subagent id was named`)
  const at = `${act} ${seatName} ${own}`
  const moment = asNumber(act === WRITING ? argv[8] : argv[6])
  if (act === WRITING) {
    if (seatId === undefined || seatId === "") return saying(`${at} — no seat id was named`)
    const kind = dispatchedAs === undefined || dispatchedAs === "" ? null : dispatchedAs
    const put = await landingAgain(() => wrote(root, seatName, seatId, own, kind))
    if (!("why" in put)) startedIn(root, pathIn(root, slugOf(seatName, own)), moment)
    return answering(put, at)
  }
  if (act === TAKING) {
    const gone = await landingAgain(() => took(root, seatName, own, runMechanicalChange, moment))
    return answering(gone, at)
  }
  return saying(`\`${act}\` is no act this takes`)
}

if (import.meta.main) {
  process.exit(await ran(Bun.argv))
}
