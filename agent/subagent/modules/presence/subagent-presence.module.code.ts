import { closeSync, existsSync, mkdirSync, openSync } from "node:fs"
import { dirname, join } from "node:path"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { akashaHolderPidOf } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import { supervisorsRootDir } from "akasha/agent/seat/supervisor/supervisor-log/modules/path/supervisor-log-path.module.code.ts"
import { bodyOf } from "akasha/agent/subagent/modules/body/subagent-body.module.code.ts"
import {
  landingAgain,
  type Went,
} from "akasha/agent/subagent/modules/landing-again/subagent-landing-again.module.code.ts"
import {
  type Reading,
  readOf,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"
import { clientStartedAt } from "akasha/agent/subagent/modules/outliving/subagent-outliving.module.code.ts"
import { subagentPageInHistory } from "akasha/agent/subagent/modules/page-history/subagent-page-history.module.code.ts"
import {
  agentIdOf,
  pathIn,
  pathsUnder,
  slugOf,
} from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  droppedOutlived,
  gaveBack,
  movedOnto,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { subagentStarted } from "akasha/agent/subagent/properties/subagent-started.number-property.ts"
import { subagentStopped } from "akasha/agent/subagent/properties/subagent-stopped.boolean-property.ts"
import { editsWaiting } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import {
  listedAt,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"

export const WRITING = "write"

export const TAKING = "take"

const SWEEPING = "sweep"

export const LOG_AT = "subagent-presence.log"

const CALLED_AS = "subagent-presence"

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const KIND = "dispatchedAs"

const ID = "id"

const ADD_PAGE = "change-mechanical/add-file-of-any-kind"

const TAKE_PAGE = "change-mechanical-file/remove-file-page"

const STARTED = subagentStarted.propertySlug

const STOPPED = subagentStopped.propertySlug

const WENT: Went = { went: true }

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

function wentBy(landed: Awaited<ReturnType<Landing>>, done: readonly string[] = []): Went {
  const wrong = refusalsIn(landed)
  if (wrong.length === 0) return WENT
  return { why: [wrong.join(" ").trim(), ...partWay(done)].join(" ") }
}

function prunedFor(root: string, seatPage: string, seatId: string): undefined {
  try {
    const pid = akashaHolderPidOf(seatId)
    const named = transcriptOf(seatId)?.value ?? null
    droppedOutlived(root, seatPage, seatId, pid === null ? null : clientStartedAt(pid), named)
  } catch {}
  return undefined
}

export async function wrote(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string | null,
  done: string[] = [],
  landing: Landing = runMechanicalChange
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathIn(root, slug)
  if (existsSync(join(root, at))) return WENT
  const named = nameFaultIn(slug)
  if (named !== null) return { why: `${named}, so ${at} was not written` }
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
  const put = wentBy(
    await landing(
      root,
      [{ at: ADD_PAGE, given: { at, body: content } }],
      had === null
        ? `${slug}: a subagent states the agent id it acts under`
        : `${slug}: a subagent resuming takes up the page it had`,
      { agentId, done }
    ),
    done
  )
  if (!("why" in put)) {
    const seat = seatPageIn(root, seatName)
    if (seat !== null) {
      if (had !== null) gaveBack(root, seat, at, agentId)
      prunedFor(root, seat, seatId)
    }
  }
  return put
}

export function seatPageIn(root: string, seatName: string): string | null {
  return listedAt(root, SEAT, seatName)[0]?.path ?? null
}

export function startedIn(root: string, page: string, startedAt: number | null): undefined {
  if (startedAt === null || !existsSync(join(root, page))) return
  mergeUncommitted(root, page, { [STARTED]: startedAt })
}

export function stoppedBeside(root: string, page: string): boolean {
  return uncommittedIn(root, page)?.[STOPPED] === true
}

function startedAfter(root: string, page: string, stoppedAt: number | null): boolean {
  if (stoppedAt === null) return false
  const held = asNumber(uncommittedIn(root, page)?.[STARTED])
  return held !== null && held > stoppedAt
}

export function leftWhereItIs(root: string, seatName: string, at: string): string | null {
  if (seatPageIn(root, seatName) !== null) return null
  if (!editsWaiting(root, at)) return null
  return (
    `the index files no page for the ${seatName} seat to move onto, and ${at} has edits waiting` +
    ` that its take-down would take away, so that page was left where it is`
  )
}

function movingOff(root: string, seatName: string, at: string): Went {
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
  done: string[] = [],
  landing: Landing = runMechanicalChange,
  stoppedAt: number | null = null,
  reading: Reading = readOf
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathIn(root, slug)
  if (!existsSync(join(root, at))) return WENT
  if (startedAfter(root, at, stoppedAt)) return WENT
  const stopped = stoppedBeside(root, at)
  if (!stopped) {
    const read = await reading(root, at, own)
    if (read.liveness === "working") return WENT
    if (read.liveness !== "returned") return { why: `${at} is left where it is — ${read.why}` }
  }
  const moved = movingOff(root, seatName, at)
  if ("why" in moved) return moved
  const said = stopped ? "was stopped from the agents panel" : "is done"
  const why = `${slug} ${said}, so its page goes; what it was is in this repository's history`
  return wentBy(await landing(root, [{ at: TAKE_PAGE, given: { at } }], why, { done }), done)
}

export async function notWorking(
  root: string,
  under: readonly string[],
  reading: Reading = readOf
): Promise<readonly string[]> {
  const left: string[] = []
  for (const at of under) if ((await reading(root, at)).liveness !== "working") left.push(at)
  return left
}

export async function tookUnder(
  root: string,
  seatName: string,
  why: string,
  done: string[] = [],
  landing: Landing = runMechanicalChange,
  reading: Reading = readOf
): Promise<Went> {
  const paths = await notWorking(root, pathsUnder(root, seatName), reading)
  if (paths.length === 0) return WENT
  const seat = seatPageIn(root, seatName)
  if (seat !== null) for (const at of paths) movedOnto(root, seat, at)
  const gone = wentBy(
    await landing(
      root,
      paths.map((at): Asking => ({ at: TAKE_PAGE, given: { at } })),
      `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`,
      { done }
    ),
    done
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

function exitFor(went: Went, at: string): number {
  return "why" in went ? saying(`${at} — ${went.why}`) : 0
}

async function ran(argv: readonly string[]): Promise<number> {
  const root = argv[2]
  const act = argv[3]
  const seatName = argv[4]
  const own = argv[5]
  const dispatchedAs = argv[6]
  const seatId = argv[7]
  if (root === undefined || root === "") return saying("no root was named")
  if (act === undefined || act === "") return saying("no act was named")
  if (seatName === undefined || seatName === "") return saying(`${act}: no seat was named`)
  const done: string[] = []
  if (act === SWEEPING) {
    const why = own
    if (why === undefined || why === "") return saying(`${act} ${seatName}: no reason was named`)
    const swept = await landingAgain(() => tookUnder(root, seatName, why, done), done)
    return exitFor(swept, `${act} ${seatName}`)
  }
  if (own === undefined || own === "") return saying(`${act} ${seatName}: no subagent id was named`)
  const at = `${act} ${seatName} ${own}`
  const moment = asNumber(act === WRITING ? argv[8] : argv[6])
  if (act === WRITING) {
    if (seatId === undefined || seatId === "") return saying(`${at} — no seat id was named`)
    const kind = dispatchedAs === undefined || dispatchedAs === "" ? null : dispatchedAs
    const put = await landingAgain(() => wrote(root, seatName, seatId, own, kind, done), done)
    if (!("why" in put)) startedIn(root, pathIn(root, slugOf(seatName, own)), moment)
    return exitFor(put, at)
  }
  if (act === TAKING) {
    const gone = await landingAgain(
      () => took(root, seatName, own, done, runMechanicalChange, moment),
      done
    )
    return exitFor(gone, at)
  }
  return saying(`\`${act}\` is no act this takes`)
}

if (import.meta.main) {
  process.exit(await ran(Bun.argv))
}
