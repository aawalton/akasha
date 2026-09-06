import { patchIn } from "@akasha/agents/patch-keeping"
import { formattedBody } from "@akasha/code/code-format"
import { agentPathOf } from "@akasha/context/warranting"
import type { Edit } from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  editsAt,
  foldedIn,
  keptEdits,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { writtenAgain } from "../../address-mapping/address-mapping.module.code.ts"
import { BREAK_GLASS, mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { type Draft, drafted, putBack, type Running } from "../../drafting/drafting.module.code.ts"
import { gateBuilt } from "../../gate-building/gate-building.module.code.ts"
import { baseOf, changeOf } from "../../landing/landing.module.code.ts"
import { editsFor } from "../change/change.command.code.ts"
import { applying } from "../patch/patch.command.code.ts"
import { MESSAGE, MESSAGE_FILE, unknownIn } from "../write/write.command.code.ts"

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const APPLYING = [MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: false }

export type Unfold = { readonly patch: string | null; readonly rows: readonly Edit[] }

export type Folded =
  | {
      readonly folded: readonly string[]
      readonly dropped: readonly string[]
      readonly unfold: Unfold | null
    }
  | { readonly refusals: readonly string[] }

function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
}

// The gate judges the body the landing writes, so a body is formatted before that body is judged.
// A body is formatted after the edits are gathered rather than before, because gathering reads the
// body an earlier edit left, and formatting a body first leaves the later edit reading another.
// A layout the formatter mends is applied rather than refused, and what a check refuses is what no
// formatter can mend.
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
    const came = one.from
    if (came !== undefined && came !== one.path) {
      held.push({ path: came, was: bytesOf(one.was), body: null })
      held.push({ path: one.path, was: null, body: bytesOf(one.body) })
      continue
    }
    held.push({ path: one.path, was: bytesOf(one.was), body: bytesOf(one.body) })
  }
  return held
}

// What the fold found is answered beside what the fold made, so a caller landing the patch after
// this can put the fold back where the landing refuses. A fold that made nothing answers no unfold,
// because putting back a patch no fold wrote would take away the patch the agent already held. A
// row for a body written again on every apply is named as dropped rather than folded, because a row
// going without being named reads as a row that landed.
export function folding(root: string, page: string): Folded {
  let answer: Folded = { folded: [], dropped: [], unfold: null }
  const kept = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const held = had.filter((one) => !writtenAgain(one.path))
    const dropped = [
      ...new Set(had.filter((one) => writtenAgain(one.path)).map((one) => one.path)),
    ].sort()
    if (held.length === 0) {
      answer = { folded: [], dropped, unfold: null }
      return null
    }
    const said = foldedIn(held)
    if (said.refused !== null) {
      answer = { refusals: [said.refused] }
      return had
    }
    const was = patchIn(root, page)
    const took = drafted(root, page, draftsOf(formattedEdits(root, said.edits)), CHANGED)
    if ("why" in took) {
      answer = { refusals: [took.why] }
      return had
    }
    answer = {
      folded: said.edits.map((one) => one.path).sort(),
      dropped,
      unfold: { patch: was, rows: had },
    }
    return null
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
}

// The edits are judged where the edits are kept, so a refusal leaves the edits beside the agent's
// page for another change to mend rather than in a patch no change reaches.
async function refusedBefore(root: string, page: string): Promise<readonly string[]> {
  const kept = keptEdits(root, page, (had) => had)
  if ("why" in kept) return [kept.why]
  if (kept.rows.length === 0) return []
  const built = gateBuilt(root)
  if ("broken" in built) return [`no check ran — the checks would not load: ${built.broken}`]
  const change = changeOf(root, {
    base: baseOf(root),
    edits: editsFor(formattedEdits(root, kept.rows)),
  })
  const said = await built.gate.over(change)
  return said.map((one) => `${one.path} — ${one.reason}`)
}

// The fold and the apply are one act, so an apply that refuses puts the edits back where the fold
// found them, for a change to mend rather than a hand. Whether the apply landed is read off the
// patch rather than off the refusals, because an apply that lands and then refuses something
// carries refusals too, and the patch it landed is gone. A row appended while the apply ran follows
// the rows put back, which is the order the rows were appended in.
export function undone(root: string, page: string, unfold: Unfold): string | null {
  if (patchIn(root, page) === null) return null
  putBack(root, page, unfold.patch)
  keptEdits(root, page, (had) => [...unfold.rows, ...had])
  return "the fold is undone — the edits are kept where the edits were, for a change to mend"
}

export async function apply(argv: readonly string[], given: Given): Promise<Answer> {
  const unknown = unknownIn(argv, APPLYING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) return mistaking([NO_PAGE])
  if (!argv.includes(BREAK_GLASS)) {
    const refused = await refusedBefore(given.root, page)
    if (refused.length > 0) return { report: [], refusals: refused, code: 3 }
  }
  const said = folding(given.root, page)
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  const answered = await applying(given, page, argv)
  const put = said.unfold === null ? null : undone(given.root, page, said.unfold)
  if (put !== null) return { report: [put], refusals: answered.refusals, code: answered.code }
  return {
    report: [
      ...said.dropped.map((one) => `${one} is dropped — that body is written again on every apply`),
      ...said.folded.map((one) => `folded ${one} into the patch`),
      ...answered.report,
    ],
    refusals: answered.refusals,
    code: answered.code,
  }
}
