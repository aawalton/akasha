import { blobIdOf, recordRead } from "akasha/agents/read-record/read-record.module.code.ts"
import {
  editsAt,
  editsIn,
  foldedIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given as Arguments } from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  noPageSaid,
  stalling,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import {
  argumentsIn,
  worldFor,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import {
  ANSWER_CEILING,
  countLines,
  numbered,
} from "akasha/commands/modules/long-body/long-body.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { offRepo, pathAt } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import { changeShow as page } from "akasha/commands/pages/change/show/change-show.command.ts"
import {
  agentPathOf,
  bytesAt,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

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

function recorded(root: string, agentId: string, at: string, folded: Uint8Array): undefined {
  const held = bytesAt(root, at)
  const shown = blobIdOf(folded)
  const oid = held === null ? shown : blobIdOf(held)
  recordRead(root, agentId, {
    path: at,
    oid,
    seenAt: Date.now(),
    carriedOid: oid === shown ? null : shown,
  })
}

function showing(given: Given, taken: Arguments): Answer {
  const path = pathIn(given.root, taken)
  if (typeof path !== "string") return mistaking(path)
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (agentPage === null || editsAt(agentPage) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const kept = editsIn(given.root, agentPage)
  if ("why" in kept) return refusedBy([kept.why], OPERATIONAL)
  const before = foldedIn(kept.rows)
  if (before.refused !== null) return refusedBy([before.refused], DATA)
  let text: string | null
  try {
    text = worldFor(given.root, kept.rows, before).textOf(path)
  } catch (thrown) {
    return stalling(given.root, kept.rows, thrown)
  }
  if (text === null) return mistaking([`\`${path}\` ${NOTHING}`])
  const bytes = BYTES.encode(text)
  if (bytes.byteLength > ANSWER_CEILING) return mistaking([`\`${path}\` ${TOO_MUCH}`])
  if (given.agentId !== null) recorded(given.root, given.agentId, path, bytes)
  return told(shownOf(path, text))
}

export function changeShow(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking([...read.refused, NO_FLAGS])
  const taken = argumentsIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  return showing(given, taken)
}
