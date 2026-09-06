import { agentPathOf } from "@akasha/context/warranting"
import type { Edit } from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  editsAt,
  foldedIn,
  keptEdits,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { BREAK_GLASS, mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { type Draft, drafted, type Running } from "../../drafting/drafting.module.code.ts"
import { applying } from "../patch/patch.command.code.ts"
import { MESSAGE, MESSAGE_FILE, unknownIn } from "../write/write.command.code.ts"

const BYTES = new TextEncoder()

const APPLYING = [MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: false }

export type Folded =
  | { readonly folded: readonly string[] }
  | { readonly refusals: readonly string[] }

function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
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

export function folding(root: string, page: string): Folded {
  let answer: Folded = { folded: [] }
  const kept = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const said = foldedIn(had)
    if (said.refused !== null) {
      answer = { refusals: [said.refused] }
      return had
    }
    const took = drafted(root, page, draftsOf(said.edits), CHANGED)
    if ("why" in took) {
      answer = { refusals: [took.why] }
      return had
    }
    answer = { folded: said.edits.map((one) => one.path).sort() }
    return null
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
}

export async function apply(argv: readonly string[], given: Given): Promise<Answer> {
  const unknown = unknownIn(argv, APPLYING, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) return mistaking([NO_PAGE])
  const said = folding(given.root, page)
  if ("refusals" in said) return { report: [], refusals: said.refusals, code: 3 }
  const answered = await applying(given, page, argv)
  return {
    report: [...said.folded.map((one) => `folded ${one} into the patch`), ...answered.report],
    refusals: answered.refusals,
    code: answered.code,
  }
}
