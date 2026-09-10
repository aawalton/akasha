import { appendFileSync, mkdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  droppedAll,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { exclusively } from "akasha/files/exclusive/exclusive.module.code.ts"
import { partedIn, uncommittedBesideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  refusalsAt,
  refusalsKept,
} from "../../commands/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { subagentEdits } from "../seats/properties/subagent-edits.file-property.ts"
import { subagentRefusals } from "../seats/properties/subagent-refusals.file-property.ts"

const EDITS_HELD = "jsonl"

const REFUSALS_HELD = "txt"

const PARTED = "\n\n"

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

function appended(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    appendFileSync(full, text)
    return undefined
  })
  return undefined
}

export function editsSaid(lines: readonly string[]): string {
  return lines.map((one) => `${one}\n`).join("")
}

export function refusalsSaid(named: string, held: string): string {
  return `${named}${PARTED}${held.trim()}${PARTED}`
}

export function movedOnto(root: string, seatPage: string, subagentPage: string): Moved {
  const editsTo = seatEditsAt(seatPage)
  const refusalsTo = seatRefusalsAt(seatPage)
  const lines = editsTo === null ? [] : linesIn(root, subagentPage)
  if (editsTo !== null && lines.length > 0) {
    appended(root, editsTo, editsSaid(lines))
    droppedAll(root, subagentPage)
  }
  const refused = refusalsTo === null ? null : textAt(root, refusalsAt(subagentPage))
  if (refusalsTo !== null && refused !== null) {
    appended(root, refusalsTo, refusalsSaid(namedAt(subagentPage), refused))
    refusalsKept(root, subagentPage, [])
  }
  return { edits: lines.length, refusals: refused !== null }
}

export function saidOf(named: string, moved: Moved): readonly string[] {
  const said: string[] = []
  if (moved.edits > 0) {
    said.push(`${named} left ${String(moved.edits)} edit(s) unlanded, and the seat keeps them`)
  }
  if (moved.refusals) said.push(`${named} was last refused, and the seat keeps why`)
  return said
}
