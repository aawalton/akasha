import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  readingsDropped,
  readsBesideAt,
} from "akasha/agents/modules/read-record/read-record.module.code.ts"
import {
  refusalsAt,
  refusalsKept,
} from "akasha/agents/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { subagentEdits } from "akasha/agents/seats/properties/subagent-edits.file-property.ts"
import { subagentReads } from "akasha/agents/seats/properties/subagent-reads.file-property.ts"
import { subagentRefusals } from "akasha/agents/seats/properties/subagent-refusals.file-property.ts"
import {
  droppedAll,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { exclusively } from "akasha/files/modules/exclusive/exclusive.module.code.ts"
import { listedAt } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { partFiled, partUnfiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import {
  partedIn,
  uncommittedBesideAt,
} from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import { textUnder } from "akasha/pages/modules/value/page-value.module.code.ts"
import {
  textAt as statedIn,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const EDITS_HELD = "jsonl"

const REFUSALS_HELD = "txt"

const READS_HELD = "jsonl"

const PARTED = "\n\n"

const SEAT = "seat"

const SUBAGENT = "subagent"

const PAGE_TYPE = "type"

const PRINCIPAL = "principalSeatName"

const AGENT_ID = "agentId"

export const LEFT_BY = "leftBy"

export const CARRIED_AT = "carriedAt"

export const READ_BY = "readBy"

export type Moved = {
  readonly edits: number
  readonly refusals: boolean
}

export function seatEditsAt(seatPage: string): string | null {
  return uncommittedBesideAt(seatPage, subagentEdits.propertySlug, EDITS_HELD)
}

export function seatRefusalsAt(seatPage: string): string | null {
  return uncommittedBesideAt(seatPage, subagentRefusals.propertySlug, REFUSALS_HELD)
}

export function seatReadsAt(seatPage: string): string | null {
  return uncommittedBesideAt(seatPage, subagentReads.propertySlug, READS_HELD)
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

function objectIn(line: string): Record<string, unknown> | null {
  let read: unknown
  try {
    read = JSON.parse(line)
  } catch {
    return null
  }
  if (typeof read !== "object" || read === null || Array.isArray(read)) return null
  return read as Record<string, unknown>
}

function marked(line: string, said: Readonly<Record<string, string>>): string {
  const read = objectIn(line)
  return read === null ? line : JSON.stringify({ ...said, ...read })
}

function readByIn(line: string): string | null {
  const said = objectIn(line)?.[READ_BY]
  return typeof said === "string" && said !== "" ? said : null
}

function readingSaid(line: string): string {
  const read = objectIn(line)
  if (read === null) return line
  const held = { ...read }
  delete held[READ_BY]
  return JSON.stringify(held)
}

export function editsSaid(lines: readonly string[], named: string, at: string): string {
  return lines.map((one) => `${marked(one, { [LEFT_BY]: named, [CARRIED_AT]: at })}\n`).join("")
}

export function readsSaid(lines: readonly string[], agentId: string): string {
  return lines.map((one) => `${marked(one, { [READ_BY]: agentId })}\n`).join("")
}

export function refusalsSaid(named: string, held: string): string {
  return `${named}${PARTED}${held.trim()}${PARTED}`
}

function readingsMoved(root: string, seatPage: string, subagentPage: string): undefined {
  const to = seatReadsAt(seatPage)
  const from = readsBesideAt(subagentPage)
  if (to === null || from === null) return undefined
  const agentId = textUnder(root, subagentPage, AGENT_ID)
  if (agentId === null) return undefined
  const held = textAt(root, from)
  if (held === null) return undefined
  const lines = held.split("\n").filter((one) => one.trim() !== "")
  if (lines.length === 0) return undefined
  appended(root, seatPage, to, readsSaid(lines, agentId))
  readingsDropped(root, subagentPage)
  return undefined
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
  readingsMoved(root, seatPage, subagentPage)
  return { edits: lines.length, refusals: refused !== null }
}

function readingsPut(root: string, page: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    writeFileSync(full, `${text}${textAt(root, at) ?? ""}`)
    partFiled(root, page, at)
    return undefined
  })
  return undefined
}

function readingsLeft(root: string, seatPage: string, at: string, text: string): undefined {
  const full = join(root, at)
  if (text === "") {
    rmSync(full, { force: true })
    partUnfiled(root, at)
    return undefined
  }
  writeFileSync(full, text)
  partFiled(root, seatPage, at)
  return undefined
}

type Parted = {
  readonly taken: readonly string[]
  readonly left: readonly string[]
}

function partedBy(held: string, taking: (by: string | null) => boolean): Parted {
  const taken: string[] = []
  const left: string[] = []
  for (const line of held.split("\n").filter((one) => one.trim() !== "")) {
    if (taking(readByIn(line))) taken.push(line)
    else left.push(`${line}\n`)
  }
  return { taken, left }
}

export function gaveBack(
  root: string,
  seatPage: string,
  subagentPage: string,
  agentId: string
): number {
  const from = seatReadsAt(seatPage)
  const to = readsBesideAt(subagentPage)
  if (from === null || to === null) return 0
  const full = join(root, from)
  if (!existsSync(full)) return 0
  return exclusively(full, (): number => {
    const held = textAt(root, from)
    if (held === null) return 0
    const said = partedBy(held, (by) => by !== null && by === agentId)
    if (said.taken.length === 0) return 0
    readingsPut(root, subagentPage, to, said.taken.map((one) => `${readingSaid(one)}\n`).join(""))
    readingsLeft(root, seatPage, from, said.left.join(""))
    return said.taken.length
  })
}

export function droppedFor(root: string, seatPage: string, agentIds: readonly string[]): number {
  const from = seatReadsAt(seatPage)
  if (from === null) return 0
  const full = join(root, from)
  if (!existsSync(full)) return 0
  const gone = new Set(agentIds.filter((one) => one !== ""))
  if (gone.size === 0) return 0
  return exclusively(full, (): number => {
    const held = textAt(root, from)
    if (held === null) return 0
    const said = partedBy(held, (by) => by !== null && gone.has(by))
    if (said.taken.length === 0) return 0
    readingsLeft(root, seatPage, from, said.left.join(""))
    return said.taken.length
  })
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
