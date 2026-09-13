import { appendFileSync, mkdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  refusalsAt,
  refusalsKept,
} from "akasha/agents/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { subagentEdits } from "akasha/agents/seats/properties/subagent-edits.file-property.ts"
import { subagentRefusals } from "akasha/agents/seats/properties/subagent-refusals.file-property.ts"
import {
  droppedAll,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { exclusively } from "akasha/files/modules/exclusive/exclusive.module.code.ts"
import { listedAt } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { partFiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import {
  partedIn,
  uncommittedBesideAt,
} from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import {
  textAt as statedIn,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const EDITS_HELD = "jsonl"

const REFUSALS_HELD = "txt"

const PARTED = "\n\n"

const SEAT = "seat"

const SUBAGENT = "subagent"

const PAGE_TYPE = "type"

const PRINCIPAL = "principalSeatName"

export const LEFT_BY = "leftBy"

export const CARRIED_AT = "carriedAt"

export type Moved = {
  readonly edits: number
  readonly refusals: boolean
}

export const NOTHING: Moved = { edits: 0, refusals: false }

export function seatEditsAt(seatPage: string): string | null {
  return uncommittedBesideAt(seatPage, subagentEdits.propertySlug, EDITS_HELD)
}

export function seatRefusalsAt(seatPage: string): string | null {
  return uncommittedBesideAt(seatPage, subagentRefusals.propertySlug, REFUSALS_HELD)
}

export function namedAt(page: string): string {
  return partedIn(page)?.slug ?? page
}

function textAt(root: string, at: string | null): string | null {
  if (at === null) return null
  try {
    const held = readFileSync(join(root, at), "utf8")
    return held.trim() === "" ? null : held
  } catch {
    return null
  }
}

function appended(root: string, page: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    appendFileSync(full, text)
    partFiled(root, page, at)
    return undefined
  })
  return undefined
}

function markedIn(line: string, named: string, at: string): string {
  let read: unknown
  try {
    read = JSON.parse(line)
  } catch {
    return line
  }
  if (typeof read !== "object" || read === null || Array.isArray(read)) return line
  return JSON.stringify({ [LEFT_BY]: named, [CARRIED_AT]: at, ...(read as object) })
}

export function editsSaid(lines: readonly string[], named: string, at: string): string {
  return lines.map((one) => `${markedIn(one, named, at)}\n`).join("")
}

export function refusalsSaid(named: string, held: string): string {
  return `${named}${PARTED}${held.trim()}${PARTED}`
}

export function movedOnto(root: string, seatPage: string, subagentPage: string): Moved {
  const editsTo = seatEditsAt(seatPage)
  const refusalsTo = seatRefusalsAt(seatPage)
  const named = namedAt(subagentPage)
  const lines = editsTo === null ? [] : linesIn(root, subagentPage)
  if (editsTo !== null && lines.length > 0) {
    appended(root, seatPage, editsTo, editsSaid(lines, named, new Date().toISOString()))
    droppedAll(root, subagentPage)
  }
  const refused = refusalsTo === null ? null : textAt(root, refusalsAt(subagentPage))
  if (refusalsTo !== null && refused !== null) {
    appended(root, seatPage, refusalsTo, refusalsSaid(named, refused))
    refusalsKept(root, subagentPage, [])
  }
  return { edits: lines.length, refusals: refused !== null }
}

export function carriedOff(root: string, at: string, value: Value): Moved | null {
  if (statedIn(value, PAGE_TYPE) !== SUBAGENT) return null
  const seatName = statedIn(value, PRINCIPAL)
  if (seatName === null) return null
  const seatPage = listedAt(root, SEAT, seatName)[0]?.path
  if (seatPage === undefined) return null
  return movedOnto(root, seatPage, at)
}

export function saidOf(named: string, moved: Moved): readonly string[] {
  const said: string[] = []
  if (moved.edits > 0) {
    said.push(`${named} left ${String(moved.edits)} edit(s) unlanded, and the seat keeps them`)
  }
  if (moved.refusals) said.push(`${named} was last refused, and the seat keeps why`)
  return said
}
