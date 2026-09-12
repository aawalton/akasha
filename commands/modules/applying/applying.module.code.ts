import {
  blobIdOf,
  type Carry,
  type Reading,
  readingIn,
  recordRead,
} from "akasha/agents/read-record/read-record.module.code.ts"
import { refusalsKept } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import { leftAt } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import { MEASURING } from "akasha/code/tests/code-tests.module.code.ts"
import type { Given as Arguments } from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { preparing } from "akasha/commands/modules/change-preparing/change-preparing.module.code.ts"
import { bodyAt } from "akasha/commands/modules/commit-reading/commit-reading.module.code.ts"
import {
  bypassedIn,
  glassSaid,
  unloadableIn,
} from "akasha/commands/modules/committing/committing.module.code.ts"
import type { Running } from "akasha/commands/modules/drafting/drafting.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  gateBuilt,
  NO_GATE,
} from "akasha/commands/modules/gate-building/gate-building.module.code.ts"
import { refusedWhereHeld } from "akasha/commands/modules/holding/holding.module.code.ts"
import { landing, type Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { carryLanded } from "akasha/commands/modules/landing-reading/landing-reading.module.code.ts"
import {
  commitSaid,
  defaultMessage,
  formattedSaid,
  landedSaid,
} from "akasha/commands/modules/landing-saying/landing-saying.module.code.ts"
import { installingIn } from "akasha/commands/modules/manifest-locking/manifest-locking.module.code.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt as textIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

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

type Put = { readonly said: readonly string[]; readonly wrong: readonly string[] }

function seatOver(root: string, page: string): string | null {
  const said = partedIn(page)
  if (said === null || said.pageType !== SUBAGENT) return null
  const value = valueAt(page, root)
  return value === null ? null : textIn(value, SEAT_KEY)
}

export function noneSaid(root: string, page: string): string {
  const seat = seatOver(root, page)
  if (seat === null) return NONE
  return `${NONE} — a subagent's draft goes to its seat when the subagent stops, so ask the ${seat} seat for what was drafted here before`
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
    over: async (change) => {
      const said = await judging.over(change)
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
  const built = gateBuilt(given.root)
  if (broken === null && !("gate" in built)) {
    return notLanded({
      report: [],
      refusals: keeping([`the checks would not load — ${built.broken}`]),
      code: 3,
    })
  }
  const built0 = broken === null && "gate" in built ? built.gate : NO_GATE
  const gate = asked.measure ? measured(built0) : built0
  const unloaded = "gate" in built ? null : built.broken
  const said0 = messageFor(asked.message, carried.rows, carried.moves)
  const bypassed = broken === null ? said0 : bypassedIn(said0, broken)
  const why = unloaded === null || broken === null ? bypassed : unloadableIn(bypassed, unloaded)
  if (asked.measure) process.env[MEASURING] = MARK
  try {
    const said = await applied(given.root, given.agentId, why, gate, given.writer, [], carried)
    if ("refusals" in said) {
      return notLanded({
        report: [...(said.said ?? [])],
        refusals: keeping(said.refusals),
        code: 3,
      })
    }
    return {
      report: [
        ...landedSaid(said.landed),
        ...formattedSaid(said.formatted),
        ...said.said,
        ...(broken === null ? [] : [glassSaid(broken)]),
        commitSaid(said.commit, said.untracked ?? []),
      ],
      refusals: keeping(said.wrong),
      code: said.wrong.length === 0 ? 0 : 3,
      landed: true,
    }
  } catch (thrown) {
    return notLanded({
      report: [],
      refusals: keeping([`nothing was committed — ${whyOf(thrown)}`]),
      code: 3,
    })
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

export function warrantedAgain(
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

function recordedAsLanded(
  root: string,
  agentId: string,
  changes: readonly FileChange[]
): undefined {
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "remove" || one.kind === "append") continue
    if (one.kind === "bring") continue
    recordRead(root, agentId, {
      path: one.path,
      oid: blobIdOf(BYTES.encode(one.kind === "add" ? one.content : one.contentTo)),
      seenAt: Date.now(),
      carriedOid: null,
    })
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
  read: string | null = null
): Promise<Applied | Refused> {
  if (carried === null) return { refusals: [NOTHING_HELD] }
  const holding = carried
  const head = gitSaid(root, ["rev-parse", "HEAD"]).trim()
  const running = holding.running
  const gate = running.checks ? judging : NO_GATE
  const moving = [...moves, ...(holding.moves ?? [])]
  const paths = pathsIn(holding.rows)
  const prepared = preparing(root, head, holding.rows, moving, holding.formatted)
  if ("refusals" in prepared) return { refusals: [...prepared.refusals, UNEXPORTABLE] }
  const formatting = prepared.formatting
  if (running.writerOwesReading && agentId !== null) warrantedAgain(root, head, agentId, paths)
  const asRead = agentId === null ? [] : asReadOf(root, agentId, paths)
  const done = await refusedWhereHeld(() =>
    landing(
      root,
      prepared.changes,
      message,
      gate,
      writer,
      read ?? head,
      asRead,
      null,
      prepared.over
    )
  )
  if ("refusals" in done) return { refusals: done.refusals, said: prepared.said }
  let put: Put = { said: [], wrong: [] }
  try {
    const carries = carriedFrom(root, head, moving)
    carryLanded(root, head, running, prepared.changes, carries, holding.owed ?? new Map())
    if (agentId !== null) recordedAsLanded(root, agentId, prepared.authored)
    put = installingIn(root, prepared.changes)
  } catch (thrown) {
    put = { said: [], wrong: [`${AFTER_COMMIT} ${whyOf(thrown)}`] }
  }
  return {
    base: done.base,
    landed: [...done.wrote, ...done.took].sort(),
    formatted: [...formatting.formatted].sort(),
    said: [
      ...prepared.said,
      ...put.said,
      ...done.linked.said,
      ...done.placed.said,
      ...done.units.said,
    ],
    wrong: [...put.wrong, ...done.linked.wrong, ...done.placed.wrong, ...done.units.wrong],
    commit: done.commit,
    untracked: done.untracked,
  }
}
