import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  readingsDropped,
  readsBesideAt,
  SUBAGENT_MARK,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  refusalsAt,
  refusalsKept,
} from "akasha/agent/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { subagentEdits } from "akasha/agent/seat/properties/subagent-edits.file-property.ts"
import { subagentReads } from "akasha/agent/seat/properties/subagent-reads.file-property.ts"
import { subagentRefusals } from "akasha/agent/seat/properties/subagent-refusals.file-property.ts"
import {
  outlivedAmong,
  subagentsDirOf,
} from "akasha/agent/subagent/modules/outliving/subagent-outliving.module.code.ts"
import {
  droppedAll,
  linesIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  partedIn,
  uncommittedBesideAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textUnder } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugOf,
  textAt as statedIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

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

function appended(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    appendFileSync(full, text)
    return undefined
  })
  return undefined
}

const LINE_HELD = z.record(z.string(), z.unknown())

function objectIn(line: string): Record<string, unknown> | null {
  try {
    const read = LINE_HELD.safeParse(JSON.parse(line))
    return read.success ? read.data : null
  } catch {
    return null
  }
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
  appended(root, to, readsSaid(lines, agentId))
  readingsDropped(root, subagentPage)
  return undefined
}

export function movedOnto(root: string, seatPage: string, subagentPage: string): Moved {
  const editsTo = seatEditsAt(seatPage)
  const refusalsTo = seatRefusalsAt(seatPage)
  const named = namedAt(subagentPage)
  const lines = editsTo === null ? [] : linesIn(root, subagentPage)
  if (editsTo !== null && lines.length > 0) {
    appended(root, editsTo, editsSaid(lines, named, new Date().toISOString()))
    droppedAll(root, subagentPage)
  }
  const refused = refusalsTo === null ? null : textAt(root, refusalsAt(subagentPage))
  if (refusalsTo !== null && refused !== null) {
    appended(root, refusalsTo, refusalsSaid(named, refused))
    refusalsKept(root, subagentPage, [])
  }
  readingsMoved(root, seatPage, subagentPage)
  return { edits: lines.length, refusals: refused !== null }
}

function readingsPut(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    writeFileSync(full, `${text}${textAt(root, at) ?? ""}`)
    return undefined
  })
  return undefined
}

function readingsLeft(root: string, at: string, text: string): undefined {
  const full = join(root, at)
  if (text === "") rmSync(full, { force: true })
  else writeFileSync(full, text)
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
    readingsPut(root, to, said.taken.map((one) => `${readingSaid(one)}\n`).join(""))
    readingsLeft(root, from, said.left.join(""))
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
    readingsLeft(root, from, said.left.join(""))
    return said.taken.length
  })
}

export function keptForIn(root: string, seatPage: string): readonly string[] {
  const from = seatReadsAt(seatPage)
  if (from === null) return []
  const held = textAt(root, from)
  if (held === null) return []
  const found = new Set<string>()
  for (const line of held.split("\n").filter((one) => one.trim() !== "")) {
    const by = readByIn(line)
    if (by !== null) found.add(by)
  }
  return [...found]
}

export function droppedOutlived(
  root: string,
  seatPage: string,
  seatId: string,
  startedAt: number | null,
  transcriptPath: string | null
): number {
  if (startedAt === null || transcriptPath === null || transcriptPath === "") return 0
  const mark = `${seatId}${SUBAGENT_MARK}`
  const owns: string[] = []
  for (const one of keptForIn(root, seatPage)) {
    if (one.startsWith(mark)) owns.push(one.slice(mark.length))
  }
  if (owns.length === 0) return 0
  const gone = outlivedAmong(owns, subagentsDirOf(transcriptPath), startedAt)
  if (gone.size === 0) return 0
  return droppedFor(
    root,
    seatPage,
    [...gone].map((own) => `${mark}${own}`)
  )
}

export function carriedOff(root: string, at: string, value: Value): Moved | null {
  if (statedIn(value, PAGE_TYPE) !== SUBAGENT) return null
  const named = statedIn(value, PRINCIPAL)
  if (named === null) return null
  const seatPage = listedAt(root, SEAT, slugOf(named))[0]?.path
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
