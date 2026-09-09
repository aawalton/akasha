import { readFileSync } from "node:fs"
import { join } from "node:path"
import { editsAt, editsIn, foldedIn } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "akasha/context/modules/warranting/warranting.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../../../command-system/fault-saying/fault-saying.module.code.ts"
import { blobIdOf, recordRead } from "../../../../command-system/reading/reading.module.code.ts"
import type { Given as Arguments } from "../../../modules/argument-reading/argument-reading.module.code.ts"
import { mistaking } from "../../../modules/asking/asking.module.code.ts"
import {
  argumentsIn,
  noPageSaid,
  worldFor,
} from "../../../modules/change-running/change-running.module.code.ts"
import { inputIn } from "../../../modules/piping/piping.module.code.ts"
import { offRepo, pathAt } from "../../../modules/said-pathing/said-pathing.module.code.ts"
import { ANSWER_CEILING, countLines, numbered } from "../../read/long-body/long-body.module.code.ts"

const AT = "at"

const BYTES = new TextEncoder()

const NO_FLAGS = "a show takes its arguments piped in, and nothing on the command line"

const NO_AT = "`at` names the path to show, and this call named none"

const NOTHING = "is at no path once the edits kept land, so there is no body to show"

const TOO_MUCH = `runs past the ${ANSWER_CEILING} bytes one answer holds, and a show takes no line range`

export function pathIn(root: string, taken: Arguments): string | readonly string[] {
  const said = Object.keys(taken).filter((key) => key !== AT)
  if (said.length > 0) return said.map((key) => `\`${key}\` is no argument a show takes`)
  const at = taken[AT]
  if (at === undefined || at.trim() === "") return [NO_AT]
  const path = pathAt(root, at.trim())
  return path === null ? [offRepo(at.trim())] : path
}

export function shownOf(path: string, text: string): readonly string[] {
  const held = countLines(text)
  if (held === 0) return [`${path} — it is empty once the edits kept land; nothing follows`]
  return [`${path} — the body once the edits kept land, ${held} lines`, numbered(text)]
}

function committedAt(root: string, at: string): Uint8Array | null {
  try {
    return readFileSync(join(root, at))
  } catch {
    return null
  }
}

export function recorded(root: string, agentId: string, at: string, folded: Uint8Array): undefined {
  const held = committedAt(root, at)
  const shown = blobIdOf(folded)
  const oid = held === null ? shown : blobIdOf(held)
  recordRead(root, agentId, {
    path: at,
    oid,
    seenAt: Date.now(),
    carriedOid: oid === shown ? null : shown,
  })
}

export function showing(given: Given, taken: Arguments): Answer {
  const path = pathIn(given.root, taken)
  if (typeof path !== "string") return mistaking(path)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const kept = editsIn(given.root, page)
  if ("why" in kept) return { report: [], refusals: [kept.why], code: 3 }
  const before = foldedIn(kept.rows)
  if (before.refused !== null) return { report: [], refusals: [before.refused], code: 3 }
  let text: string | null
  try {
    text = worldFor(given.root, kept.rows, before).textOf(path)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
  if (text === null) return mistaking([`\`${path}\` ${NOTHING}`])
  const bytes = BYTES.encode(text)
  if (bytes.byteLength > ANSWER_CEILING) return mistaking([`\`${path}\` ${TOO_MUCH}`])
  if (given.agentId !== null) recorded(given.root, given.agentId, path, bytes)
  return { report: shownOf(path, text), refusals: [], code: 0 }
}

export function changeShow(argv: readonly string[], given: Given): Answer {
  if (argv.length > 0) return mistaking([NO_FLAGS])
  const taken = argumentsIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  return showing(given, taken)
}
