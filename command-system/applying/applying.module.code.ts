import type { Judging } from "@akasha/checks/judging"
import { MEASURING } from "@akasha/code/code-tests"
import { said as gitSaid } from "@akasha/git/git-running"
import { partedIn } from "@akasha/pages/page-file-name"
import { textAt as textIn, valueAt } from "@akasha/pages/page-value"
import { preparing } from "../../commands/modules/change-preparing/change-preparing.module.code.ts"
import { installingIn } from "../../commands/modules/manifest-locking/manifest-locking.module.code.ts"
import type { Given as Arguments } from "../argument-reading/argument-reading.module.code.ts"
import { bypassedIn, glassSaid, mistaking, unloadableIn } from "../asking/asking.module.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import { type Bodies, owedOf, type Running, rebasedHeld } from "../drafting/drafting.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"
import { gateBuilt, NO_GATE } from "../gate-building/gate-building.module.code.ts"
import { editsOf, type FileEdit, landing, type Refused } from "../landing/landing.module.code.ts"
import { carryLanded } from "../landing-reading/landing-reading.module.code.ts"
import { defaultMessage, formattedSaid } from "../landing-saying/landing-saying.module.code.ts"
import type { FileMove } from "../path-moving/path-moving.module.code.ts"
import { blobIdOf, type Reading, readingIn, recordRead } from "../reading/reading.module.code.ts"
import { refusalsKept } from "../refusals-keeping/refusals-keeping.module.code.ts"

const NOTHING_HELD = "no bodies were handed in, so nothing is there to apply"

const KEPT_AS_IT_WAS = "nothing was applied — the edits are as the edits were"

const CLASHED = "nothing was applied — a change carrying a conflict does not apply"

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

export function messageFor(
  said: string | null,
  held: Bodies,
  moves: readonly FileMove[] = []
): string {
  return said ?? defaultMessage(APPLIES, [...held.keys(), ...moves.map((one) => one.to)])
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
  taken: Arguments,
  carried: Carried | null
): Promise<Applying> {
  const keeping = (refusals: readonly string[]): readonly string[] =>
    refusalsKept(given.root, page, refusals)
  const asked = askedIn(taken)
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
  const said0 = messageFor(asked.message, carried.held, carried.moves)
  const bypassed = broken === null ? said0 : bypassedIn(said0, broken)
  const why = unloaded === null || broken === null ? bypassed : unloadableIn(bypassed, unloaded)
  if (asked.measure) process.env[MEASURING] = MARK
  try {
    const said = await applied(given.root, given.agentId, why, gate, given.writer, [], carried)
    if ("refusals" in said) {
      return notLanded({ report: [], refusals: keeping(said.refusals), code: 3 })
    }
    return {
      report: [
        ...said.landed.map((one) => `landed ${one}`),
        ...formattedSaid(said.formatted),
        ...said.said,
        ...(broken === null ? [] : [glassSaid(broken)]),
        said.commit === null
          ? "nothing was committed — the tree already holds what the change asked for"
          : `committed as ${said.commit}`,
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
  readonly held: Bodies
  readonly running: Running
  readonly moves?: readonly FileMove[]
  readonly formatted?: ReadonlyMap<string, Uint8Array>
}

export type Applied = {
  readonly base: string
  readonly landed: readonly string[]
  readonly formatted: readonly string[]
  readonly said: readonly string[]
  readonly wrong: readonly string[]
  readonly commit: string | null
}

export function warrantedAgain(
  root: string,
  agentId: string,
  held: Bodies,
  moved: readonly string[]
): readonly string[] {
  const again: string[] = []
  for (const [path, one] of held) {
    if (moved.includes(path) || one.was === null) continue
    const oid = blobIdOf(one.was)
    recordRead(root, agentId, { path, oid, seenAt: Date.now(), carriedOid: null })
    again.push(path)
  }
  return again.sort()
}

function asReadOf(root: string, agentId: string, held: Bodies): readonly Reading[] {
  const out: Reading[] = []
  for (const path of held.keys()) {
    const seen = readingIn(root, agentId, path)
    if (seen !== null) out.push(seen)
  }
  return out
}

function recordedAsLanded(root: string, agentId: string, changes: readonly FileEdit[]): undefined {
  for (const one of changes) {
    if (one.body === null) continue
    recordRead(root, agentId, {
      path: one.path,
      oid: blobIdOf(one.body),
      seenAt: Date.now(),
      carriedOid: null,
    })
  }
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
  const said = rebasedHeld(root, head, holding.held)
  if ("why" in said) return { refusals: [said.why, KEPT_AS_IT_WAS] }
  if (said.clashed.length > 0) {
    return {
      refusals: [
        ...said.clashed.map((one) => `${one} — the change carries a conflict here`),
        CLASHED,
      ],
    }
  }
  const running = holding.running
  const gate = running.checks ? judging : NO_GATE
  const moving = [...moves, ...(holding.moves ?? [])]
  const prepared = preparing(root, head, editsOf(said.held), moving, holding.formatted)
  if ("refusals" in prepared) return { refusals: [...prepared.refusals, UNEXPORTABLE] }
  const formatting = prepared.formatting
  if (running.writerOwesReading && agentId !== null)
    warrantedAgain(root, agentId, said.held, said.moved)
  const asRead = agentId === null ? [] : asReadOf(root, agentId, said.held)
  const done = await landing(
    root,
    prepared.changes,
    message,
    gate,
    writer,
    read ?? head,
    asRead,
    moving,
    null,
    prepared.over
  )
  if ("refusals" in done) return done
  carryLanded(root, head, running, prepared.changes, [], owedOf(said.held))
  if (agentId !== null) recordedAsLanded(root, agentId, prepared.authored)
  const put = installingIn(root, prepared.changes, moving)
  return {
    base: done.base,
    landed: [...done.wrote, ...done.took].sort(),
    formatted: [...formatting.formatted].sort(),
    said: [...prepared.said, ...put.said],
    wrong: put.wrong,
    commit: done.commit,
  }
}
