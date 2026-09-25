import {
  blobIdOf,
  type Carry,
  type Reading,
  readingIn,
  recordRead,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { refusalsKept } from "akasha/agent/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { type FileChange, leftAt } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { MEASURING } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import { installingIn } from "akasha/code/workspace/modules/manifest-locking/manifest-locking.module.code.ts"
import {
  answeredWith,
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given as Arguments } from "akasha/command/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { machineOver } from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import type { Running } from "akasha/command/modules/change-kind-running/change-kind-running.module.code.ts"
import {
  type Prepared,
  preparing,
} from "akasha/command/modules/change-preparing/change-preparing.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  gateBuilt,
  NO_GATE,
} from "akasha/command/modules/gate-building/gate-building.module.code.ts"
import {
  AGAIN_WRITTEN,
  type Committing,
  landing,
  type Refused,
} from "akasha/command/modules/landing/landing.module.code.ts"
import { carryLanded } from "akasha/command/modules/landing-reading/landing-reading.module.code.ts"
import {
  REWORKED_AT_MOST,
  reworked,
} from "akasha/command/modules/landing-reworking/landing-reworking.module.code.ts"
import {
  commitSaid,
  defaultMessage,
  formattedSaid,
  landedSaid,
} from "akasha/command/modules/landing-saying/landing-saying.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { movedSinceRead } from "akasha/command/modules/read-stamping/read-stamping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { bytesAt } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import {
  bypassedIn,
  glassSaid,
  unloadableIn,
} from "akasha/git/modules/committing/committing.module.code.ts"
import { refusedWhereHeld } from "akasha/git/modules/holding/holding.module.code.ts"
import { said as gitSaid } from "akasha/git/modules/running/git-running.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const NOTHING_HELD = "no rows were handed in, so nothing is there to apply"

const UNEXPORTABLE = "nothing was applied — a page whose slug names no export does not apply"

const NONE = "nothing is drafted here, so no edits are kept"

const SUBAGENT = "subagent"

const SEAT_KEY = "principalSeatName"

const APPLIES = "apply"

const MESSAGE = "message"

const GLASS = "break-the-glass"

const NO_MESSAGE = "`message` says what the commit is for, and this one is empty"

const NO_GLASS = "`break-the-glass` says why no check runs, and this one is empty"

const MEASURES = "measure"

const TRUE = "true"

const MARK = "1"

const NO_MEASURE = "`measure` takes `true`, and this one says something else"

const NOTHING_MEASURED =
  "this apply was to measure, and nothing it carries sits beside a test, so nothing landed"

const AFTER_COMMIT = "the commit landed, and the work after that commit stopped —"

const NOTHING_COMMITTED = "nothing was committed —"

const IN_GIT = "is in git, so read that commit rather than drafting these rows again"

type Put = { readonly said: readonly string[]; readonly wrong: readonly string[] }

function seatOver(root: string, page: string): string | null {
  const said = partedIn(page)
  if (said === null || said.pageType !== SUBAGENT) return null
  const value = valueAt(page, root)
  return value === null ? null : slugAt(value, SEAT_KEY)
}

function noneSaid(root: string, page: string): string {
  const seat = seatOver(root, page)
  if (seat === null) return NONE
  return (
    `${NONE} — a subagent's draft goes to its seat when the subagent stops, so ask the ${seat}` +
    " seat for what was drafted here before — `akasha change subagent take` takes it into that" +
    " seat's own edits, and an apply there lands it"
  )
}

export function pathsIn(rows: readonly FileChange[]): readonly string[] {
  return rows.map(leftAt)
}

export function messageFor(
  said: string | null,
  rows: readonly FileChange[],
  moves: readonly FileMove[] = []
): string {
  return said ?? defaultMessage(APPLIES, [...pathsIn(rows), ...moves.map((one) => one.to)])
}

export type Applying = Answer & { readonly landed: boolean }

function notLanded(answer: Answer): Applying {
  return { ...answer, landed: false }
}

function landedAs(answer: Answer): Applying {
  return { ...answer, landed: true }
}

function stoppedBy(commit: string | null, thrown: unknown): readonly string[] {
  if (commit === null) return [`${NOTHING_COMMITTED} ${whyOf(thrown)}`]
  return [`${AFTER_COMMIT} ${whyOf(thrown)}`, `${commit} ${IN_GIT}`]
}

export type Asked = {
  readonly message: string | null
  readonly glass: string | null
  readonly measure: boolean
}

export type Taken = Asked | { readonly refusals: readonly string[] }

export function askedIn(taken: Arguments): Taken {
  const said = Object.keys(taken)
    .filter((key) => key !== MESSAGE && key !== GLASS && key !== MEASURES)
    .map((key) => `\`${key}\` is no argument an apply takes`)
  if (said.length > 0) return { refusals: said }
  const one = taken[MESSAGE]
  const two = taken[GLASS]
  const three = taken[MEASURES]
  const message = one === undefined ? null : one.trim()
  const glass = two === undefined ? null : two.trim()
  if (message === "") return { refusals: [NO_MESSAGE] }
  if (glass === "") return { refusals: [NO_GLASS] }
  if (three !== undefined && three.trim() !== TRUE) return { refusals: [NO_MEASURE] }
  return { message, glass, measure: three !== undefined }
}

function measured(judging: Judging): Judging {
  return {
    named: judging.named,
    checksFor: judging.checksFor,
    over: async (change, done) => {
      const said = await judging.over(change, done)
      if (said.length > 0) return said
      return [{ path: change.changed[0] ?? "", reason: NOTHING_MEASURED }]
    },
  }
}

export async function applying(
  given: Given,
  page: string,
  asked: Taken,
  carried: Carried | null
): Promise<Applying> {
  const keeping = (refusals: readonly string[]): readonly string[] =>
    refusalsKept(given.root, page, refusals)
  if ("refusals" in asked) return notLanded(mistaking(keeping(asked.refusals)))
  const broken = asked.glass
  if (carried === null) {
    return notLanded(mistaking(keeping([noneSaid(given.root, page)])))
  }
  const built = await gateBuilt(given.root)
  if (broken === null && !("gate" in built)) {
    const unloadable = `the checks would not load — ${built.broken}`
    return notLanded(refusedBy(keeping([unloadable]), OPERATIONAL))
  }
  const built0 = broken === null && "gate" in built ? built.gate : NO_GATE
  const gate = asked.measure ? measured(built0) : built0
  const unloaded = "gate" in built ? null : built.broken
  const said0 = messageFor(asked.message, carried.rows, carried.moves)
  const bypassed = broken === null ? said0 : bypassedIn(said0, broken)
  const why = unloaded === null || broken === null ? bypassed : unloadableIn(bypassed, unloaded)
  if (asked.measure) process.env[MEASURING] = MARK
  const noting: Committing = { commit: null }
  try {
    const said = await applied(
      given.root,
      given.agentId,
      why,
      gate,
      given.writer,
      [],
      carried,
      null,
      [],
      noting
    )
    if ("refusals" in said) {
      return notLanded(answeredWith([...(said.said ?? [])], keeping(said.refusals), said.code))
    }
    return landedAs(
      answeredWith(
        [
          ...landedSaid(said.landed),
          ...formattedSaid(said.formatted),
          ...said.said,
          ...(broken === null ? [] : [glassSaid(broken)]),
          commitSaid(said.commit, said.untracked ?? []),
        ],
        keeping(said.wrong),
        said.wrong.length === 0 ? OK : OPERATIONAL
      )
    )
  } catch (thrown) {
    const stopped = refusedBy(keeping(stoppedBy(noting.commit, thrown)), OPERATIONAL)
    return noting.commit === null ? notLanded(stopped) : landedAs(stopped)
  } finally {
    delete process.env[MEASURING]
  }
}

export type Carried = {
  readonly rows: readonly FileChange[]
  readonly running: Running
  readonly moves?: readonly FileMove[]
  readonly formatted?: ReadonlySet<string>
  readonly owed?: ReadonlyMap<string, boolean>
  readonly own?: ReadonlyMap<string, string>
  readonly readFrom?: ReadonlyMap<string, string>
}

export type Applied = {
  readonly base: string
  readonly landed: readonly string[]
  readonly formatted: readonly string[]
  readonly said: readonly string[]
  readonly wrong: readonly string[]
  readonly commit: string | null
  readonly untracked?: readonly string[]
}

export function refusalsIn(landed: Applied | Refused): readonly string[] {
  if ("refusals" in landed) return landed.refusals
  for (const one of landed.wrong) process.stderr.write(`${one}\n`)
  return []
}

function warrantedAgain(
  root: string,
  head: string,
  agentId: string,
  paths: readonly string[]
): readonly string[] {
  const again: string[] = []
  for (const path of paths) {
    const now = bodyAt(root, head, path)
    if (now === null) continue
    recordRead(root, agentId, {
      path,
      oid: blobIdOf(now),
      seenAt: Date.now(),
      carriedOid: null,
    })
    again.push(path)
  }
  return again.sort()
}

function asReadOf(root: string, agentId: string, paths: readonly string[]): readonly Reading[] {
  const out: Reading[] = []
  for (const path of paths) {
    const seen = readingIn(root, agentId, path)
    if (seen !== null) out.push(seen)
  }
  return out
}

const BYTES = new TextEncoder()

function ownIn(carried: Carried): ReadonlyMap<string, string> {
  if (!carried.running.writerOwesReading) return new Map()
  if (carried.own !== undefined) return carried.own
  const own = new Map<string, string>()
  for (const one of carried.rows) {
    if (one.writerOwesReading === false) continue
    if (one.kind === "add") own.set(one.path, one.content)
    if (one.kind === "replace") own.set(one.path, one.contentTo)
  }
  return own
}

function recordedAsLanded(
  root: string,
  agentId: string,
  own: ReadonlyMap<string, string>
): undefined {
  for (const [path, body] of own) {
    const landed = bytesAt(root, path)
    if (landed === null) continue
    const oid = blobIdOf(landed)
    if (oid !== blobIdOf(BYTES.encode(body))) continue
    recordRead(root, agentId, { path, oid, seenAt: Date.now(), carriedOid: null })
  }
}

function carriedFrom(root: string, base: string, moves: readonly FileMove[]): readonly Carry[] {
  const held: Carry[] = []
  for (const one of moves) {
    const was = bodyAt(root, base, one.from)
    if (was === null) continue
    held.push({ was: one.from, now: one.to, from: blobIdOf(was) })
  }
  return held
}

export async function applied(
  root: string,
  agentId: string | null,
  message: string,
  judging: Judging,
  writer: string | null = null,
  moves: readonly FileMove[] = [],
  carried: Carried | null = null,
  read: string | null = null,
  done: string[] = [],
  noting: Committing | null = null
): Promise<Applied | Refused> {
  if (carried === null) return { refusals: [NOTHING_HELD], code: INPUT }
  const holding = carried
  const head = gitSaid(root, ["rev-parse", "HEAD"]).trim()
  const running = holding.running
  const gate = running.checks ? judging : NO_GATE
  const moving = [...moves, ...(holding.moves ?? [])]
  const paths = pathsIn(holding.rows)
  const prepared = preparing(root, head, holding.rows, moving, holding.formatted)
  if ("refusals" in prepared) {
    return { refusals: [...prepared.refusals, UNEXPORTABLE], code: prepared.code }
  }
  const readFrom = holding.readFrom ?? new Map<string, string>()
  const machine = machineOver(root, [...readFrom.keys()], [], prepared.facing)
  const unread = movedSinceRead(root, head, readFrom, machine, AGAIN_WRITTEN)
  if (unread !== null) return { refusals: unread, code: DATA, said: prepared.said }
  if (running.writerOwesReading && agentId !== null) warrantedAgain(root, head, agentId, paths)
  const asRead = agentId === null ? [] : asReadOf(root, agentId, paths)
  const landedOn = (at: string, over: Prepared) =>
    refusedWhereHeld(() =>
      landing(
        root,
        over.changes,
        message,
        gate,
        writer,
        read ?? at,
        asRead,
        null,
        over.over,
        done,
        noting,
        over.facing,
        over.settled
      )
    )
  const first = { head, prepared, ended: await landedOn(head, prepared) }
  const again = (at: string) => preparing(root, at, holding.rows, moving, holding.formatted)
  const last = await reworked(root, first, again, landedOn, read === null ? REWORKED_AT_MOST : 0)
  const ended = last.ended
  if ("refusals" in ended) {
    return { refusals: ended.refusals, code: ended.code, said: last.prepared.said }
  }
  let put: Put = { said: [], wrong: [] }
  try {
    const carries = carriedFrom(root, last.head, moving)
    carryLanded(root, last.head, running, last.prepared.changes, carries, holding.owed ?? new Map())
    if (agentId !== null) recordedAsLanded(root, agentId, ownIn(holding))
    put = installingIn(root, last.prepared.changes)
  } catch (thrown) {
    put = { said: [], wrong: [`${AFTER_COMMIT} ${whyOf(thrown)}`] }
  }
  return {
    base: ended.base,
    landed: [...ended.wrote, ...ended.took].sort(),
    formatted: [...last.prepared.formatting.formatted].sort(),
    said: [...last.prepared.said, ...put.said, ...ended.linked.said, ...ended.placed.said],
    wrong: [...put.wrong, ...ended.linked.wrong, ...ended.placed.wrong],
    commit: ended.commit,
    untracked: ended.untracked,
  }
}
