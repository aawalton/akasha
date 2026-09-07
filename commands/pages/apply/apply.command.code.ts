import { formattedBody } from "@akasha/code/code-format"
import { agentPathOf, changingOf, owedIn } from "@akasha/context/warranting"
import type { Edit } from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import { bytesOf } from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import {
  droppedFirst,
  editsAt,
  foldedIn,
  keptEdits,
  linesIn,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { writtenAgain } from "../../../command-system/address-mapping/address-mapping.module.code.ts"
import { applying, type Carried } from "../../../command-system/applying/applying.module.code.ts"
import { BREAK_GLASS, mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { waitingSaid } from "../../../command-system/change-acting/change-acting.module.code.ts"
import {
  MESSAGE,
  MESSAGE_FILE,
  unknownIn,
} from "../../../command-system/command-flags/command-flags.module.code.ts"
import {
  type Bodies,
  type Body,
  carriedFor,
  type Draft,
  type Rebased,
  type Running,
  rebasedHeld,
} from "../../../command-system/drafting/drafting.module.code.ts"
import { gateBuilt } from "../../../command-system/gate-building/gate-building.module.code.ts"
import { baseOf, changeOf } from "../../../command-system/landing/landing.module.code.ts"
import { editsFor, noPageSaid } from "../change/change.command.code.ts"

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const APPLYING = [MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: true }

export type Unfold = { readonly went: readonly string[] }

export type Folded =
  | {
      readonly folded: readonly string[]
      readonly dropped: readonly string[]
      readonly unfold: Unfold | null
      readonly carried: Carried | null
    }
  | { readonly refusals: readonly string[] }

export function formattedEdits(root: string, rows: readonly Edit[]): readonly Edit[] {
  return rows.map((one) => {
    if (one.body === null) return one
    const done = formattedBody(root, one.path, BYTES.encode(one.body))
    return done.changed ? { ...one, body: TEXT.decode(done.body) } : one
  })
}

export function draftsOf(edits: readonly Edit[]): readonly Draft[] {
  const held: Draft[] = []
  for (const one of edits) {
    const owed = one.readersOweReading
    const came = one.from
    if (came !== undefined && came !== one.path) {
      held.push({ path: came, was: bytesOf(one.was), body: null, readersOweReading: owed })
      held.push({ path: one.path, was: null, body: bytesOf(one.body), readersOweReading: owed })
      continue
    }
    held.push({
      path: one.path,
      was: bytesOf(one.was),
      body: bytesOf(one.body),
      readersOweReading: owed,
    })
  }
  return held
}

export function folding(root: string, page: string): Folded {
  const carried = carriedFor(root, page)
  let answer: Folded = { folded: [], dropped: [], unfold: null, carried }
  const kept = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const held = had.filter((one) => !writtenAgain(one.path))
    const dropped = [
      ...new Set(had.filter((one) => writtenAgain(one.path)).map((one) => one.path)),
    ].sort()
    if (held.length === 0) {
      answer = { folded: [], dropped, unfold: null, carried }
      return null
    }
    const said = foldedIn(held)
    if (said.refused !== null) {
      answer = { refusals: [said.refused] }
      return had
    }
    answer = {
      folded: said.edits.map((one) => one.path).sort(),
      dropped,
      unfold: { went: linesIn(root, page) },
      carried: { held: heldOf(draftsOf(formattedEdits(root, said.edits))), running: CHANGED },
    }
    return had
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
}

export function unwarranted(
  root: string,
  agentId: string | null,
  rows: readonly Edit[]
): readonly string[] {
  const owing = rows.filter((one) => one.writerOwesReading !== false)
  if (owing.length === 0) return []
  const edits = editsFor(formattedEdits(root, owing))
  return owedIn(
    root,
    agentId,
    edits.map((one) => one.path),
    changingOf(root, edits)
  )
}

export function heldOf(drafts: readonly Draft[]): Bodies {
  const held = new Map<string, Body>()
  for (const one of drafts) {
    held.set(one.path, { was: one.was, body: one.body, readersOweReading: one.readersOweReading })
  }
  return held
}

export function rebasedRows(
  root: string,
  base: string,
  rows: readonly Edit[]
): Rebased | { readonly why: string } {
  const said = foldedIn(rows)
  if (said.refused !== null) return { why: said.refused }
  return rebasedHeld(root, base, heldOf(draftsOf(formattedEdits(root, said.edits))))
}

async function refusedBefore(root: string, page: string): Promise<readonly string[]> {
  const kept = keptEdits(root, page, (had) => had)
  if ("why" in kept) return [kept.why]
  if (kept.rows.length === 0) return []
  const base = baseOf(root)
  const rebased = rebasedRows(root, base, kept.rows)
  if ("why" in rebased) return [rebased.why]
  if (rebased.clashed.length > 0) return []
  const built = gateBuilt(root)
  if ("broken" in built) return [`no check ran — the checks would not load: ${built.broken}`]
  const change = changeOf(root, {
    base,
    edits: [...rebased.held].map(([path, one]) => ({ path, body: one.body })),
  })
  const said = await built.gate.over(change)
  return said.map((one) => `${one.path} — ${one.reason}`)
}

export function undone(root: string, page: string, unfold: Unfold, landed: boolean): string | null {
  if (landed) {
    droppedFirst(root, page, unfold.went)
    return null
  }
  return "the fold is undone — the edits are kept where the edits were, for a change to mend"
}

export async function apply(argv: readonly string[], given: Given): Promise<Answer> {
  const unknown = unknownIn(argv, APPLYING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const held = keptEdits(given.root, page, (had) => had)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  const owing = unwarranted(given.root, given.agentId, held.rows)
  if (owing.length > 0) return { report: [], refusals: owing, code: 3 }
  if (!argv.includes(BREAK_GLASS)) {
    const refused = await refusedBefore(given.root, page)
    if (refused.length > 0) return { report: [], refusals: refused, code: 3 }
  }
  const said = folding(given.root, page)
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  const answered = await applying(given, page, argv, said.carried)
  const put = said.unfold === null ? null : undone(given.root, page, said.unfold, answered.landed)
  if (put !== null) return { report: [put], refusals: answered.refusals, code: answered.code }
  return {
    report: [
      ...said.dropped.map((one) => `${one} is dropped — that body is written again on every apply`),
      ...said.folded.map((one) => `folded ${one} into the patch`),
      ...answered.report,
      ...waitingSaid(given.root, page),
    ],
    refusals: answered.refusals,
    code: answered.code,
  }
}
