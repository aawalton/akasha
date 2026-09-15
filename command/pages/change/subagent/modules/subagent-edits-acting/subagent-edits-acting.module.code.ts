import { existsSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  CARRIED_AT,
  LEFT_BY,
  seatEditsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { type BodyOf, expanded } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { FileChange, Held } from "akasha/change/modules/answer/change-answer.module.types.ts"
import {
  appendEdits,
  bodyIn,
  editStated,
  editsIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  missedIn,
  namedIn,
  pathsSaid,
  rootedAt,
  saidOf,
  type Words,
  wording,
} from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  ANSWER_CEILING,
  countLines,
} from "akasha/command/modules/long-body/long-body.module.code.ts"
import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import { textIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const NO_SUBAGENT = "no subagent said"

const NO_TIME = "no time said"

const NO_EDIT = "this line reads as no edit"

const NOTHING_HELD = "no records are kept beside this agent's page for the subagents under it"

const NOTHING_KEPT = `${NOTHING_HELD}, so nothing went`

const NO_RECORD_AT = "names no record kept beside this agent's page"

const DROPPED = "these records are gone"

const STILL_KEPT = "still kept beside this agent's page"

const READS_ONE =
  "`akasha change subagent show` reads one of these whole, and `akasha change subagent drop`" +
  " takes one away"

const UNDECIDABLE =
  "whether a record here landed already is undecidable, so read one before trusting it"

const TAKES_ONE =
  "`akasha change subagent take` takes one of these into the edits this agent keeps, and" +
  " `akasha change apply` lands those"

const TOO_MUCH = `runs past the ${ANSWER_CEILING} bytes one answer holds, and no line range is taken`

const BYTES = new TextEncoder()

export type KeptRecord = {
  readonly at: number
  readonly leftBy: string | null
  readonly carriedAt: string | null
  readonly edit: FileChange | null
  readonly line: string
}

function recordOf(line: string, at: number): KeptRecord {
  const bare = { at, leftBy: null, carriedAt: null, edit: null, line }
  let read: unknown
  try {
    read = JSON.parse(line)
  } catch {
    return bare
  }
  if (typeof read !== "object" || read === null || Array.isArray(read)) return bare
  const held = read as Record<string, unknown>
  return {
    at,
    leftBy: textIn(held, LEFT_BY),
    carriedAt: textIn(held, CARRIED_AT),
    edit: editStated(read),
    line,
  }
}

export function recordsKept(root: string, page: string): readonly KeptRecord[] {
  const at = seatEditsAt(page)
  const text = at === null ? null : textThere(join(root, at))
  if (text === null) return []
  return text
    .split("\n")
    .filter((one) => one !== "")
    .map((one, index) => recordOf(one, index + 1))
}

function saidAbout(one: KeptRecord): string {
  const did = one.edit === null ? NO_EDIT : saidOf(one.edit)
  return `${String(one.at)}. ${one.leftBy ?? NO_SUBAGENT}, ${one.carriedAt ?? NO_TIME} — ${did}`
}

export function listingRecords(root: string, page: string): Answer {
  const held = recordsKept(root, page)
  if (held.length === 0) return told([NOTHING_HELD])
  return told([...held.map(saidAbout), READS_ONE, UNDECIDABLE, TAKES_ONE])
}

function bodySaid(named: string, text: string): string {
  return `${named}, ${counted(countLines(text), "line")}\n${text}`
}

function bodiesOf(one: KeptRecord): readonly string[] {
  const edit = one.edit
  if (edit === null) return [one.line]
  if (edit.kind === "replace") {
    return [bodySaid("old", edit.contentFrom), bodySaid("new", edit.contentTo)]
  }
  if (edit.kind === "add" || edit.kind === "append") return [bodySaid("body", edit.content)]
  return []
}

export function showingRecords(root: string, page: string, path: string): Answer {
  const held = recordsKept(root, page).filter(
    (one) => one.edit !== null && namedIn(one.edit, [path])
  )
  if (held.length === 0) return mistaking([`\`${path}\` ${NO_RECORD_AT}`])
  const said = held.flatMap((one) => [saidAbout(one), ...bodiesOf(one)])
  if (BYTES.encode(said.join("\n")).byteLength > ANSWER_CEILING) {
    return mistaking([`\`${path}\` ${TOO_MUCH}`])
  }
  return told(said)
}

export const RECORD_WORDS: Words = wording({
  said: "drop",
  every: "takes every record away",
  all: "takes away every record kept",
  toDo: "take away every record kept",
  missing: `${NO_RECORD_AT}, so nothing went`,
})

function put(root: string, at: string, lines: readonly string[]): undefined {
  const full = join(root, at)
  if (lines.length === 0) rmSync(full, { force: true })
  else writeFileSync(full, lines.map((one) => `${one}\n`).join(""))
  return undefined
}

function dropped(root: string, page: string, at: string, paths: readonly string[]): Answer {
  const had = recordsKept(root, page)
  if (had.length === 0) return told([NOTHING_KEPT])
  const bare = paths.length === 0
  const went = bare ? had : had.filter((one) => one.edit !== null && namedIn(one.edit, paths))
  const edits = went.flatMap((one) => (one.edit === null ? [] : [one.edit]))
  const missed = missedIn(paths, edits, RECORD_WORDS)
  if (missed.length > 0) return mistaking(missed)
  const left = had.filter((one) => !went.includes(one))
  put(
    root,
    at,
    left.map((one) => one.line)
  )
  const rest = left.length === 0 ? [] : [`${counted(left.length, "record")} ${STILL_KEPT}`]
  return told([...went.map(saidAbout), DROPPED, ...rest])
}

export function droppingRecords(root: string, page: string, said: readonly string[]): Answer {
  const paths = rootedAt(root, said)
  if (typeof paths === "string") return mistaking([paths])
  const at = seatEditsAt(page)
  if (at === null || !existsSync(join(root, at))) return told([NOTHING_KEPT])
  try {
    return exclusively(join(root, at), (): Answer => dropped(root, page, at, paths))
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

const UNLANDED = "unlanded"

const NOTHING_TAKEN = `${NOTHING_HELD}, so nothing was taken`

const NO_EDIT_KEPT = "every record kept here reads as no edit, so nothing was taken"

const TAKEN = "these records are kept beside this agent's page as edits of this agent's own"

const APPLY_LANDS = "`akasha change apply` lands them"

const UNDECIDED =
  "the body holds both the text this record was drafted against and the text this record" +
  " leaves, so whether it landed already is undecidable"

const LANDED =
  "the body holds the text this record leaves and not the text it was drafted against, so it" +
  " reads as landed already"

const STALE =
  "the body holds neither the text this record was drafted against nor the text it leaves, so" +
  " it fits nothing here"

const READ_FIRST =
  "`akasha change subagent show` reads one of these whole — where you read it and it has not" +
  " landed, say `unlanded: true` beside the paths to take it even so"

const DROP_INSTEAD = "`akasha change subagent drop` takes a record away without landing it"

const NOTHING_WENT = "every record is left where it is, and this call keeps no edit"

const UNLANDED_VALUE =
  "`unlanded` takes `true` to take a record whose landing is undecidable, and no other value"

export const TAKE_WORDS: Words = wording({
  said: "take",
  every: "reaches every record",
  all: "reaches every record kept",
  toDo: "reach every record kept",
  missing: `${NO_RECORD_AT}, so nothing was taken`,
})

export type Verdict = "takes" | "undecidable" | "landed" | "stale"

export type Judged = {
  readonly record: KeptRecord
  readonly verdict: Verdict
}

type Over = {
  readonly body: BodyOf
  readonly held: Map<string, Held | null>
}

function textOf(body: BodyOf, path: string): string | null {
  const held = body(path)
  return typeof held === "string" ? held : null
}

function leftAlready(one: FileChange, body: BodyOf): boolean {
  if (one.kind === "replace") {
    const text = textOf(body, one.path)
    return one.contentTo !== "" && text !== null && text.includes(one.contentTo)
  }
  if (one.kind === "add") return textOf(body, one.path) === one.content
  if (one.kind === "append") {
    const text = textOf(body, one.path)
    return one.content !== "" && text !== null && text.endsWith(one.content)
  }
  if (one.kind === "remove") return body(one.path) === null
  if (one.kind === "move") return body(one.pathFrom) === null && body(one.pathTo) !== null
  return false
}

function overIn(root: string): Over {
  const held = new Map<string, Held | null>()
  const under = bodyIn(root)
  return { held, body: (path) => (held.has(path) ? (held.get(path) ?? null) : under(path)) }
}

function stepped(over: Over, one: FileChange): boolean {
  const grown = expanded(one, over.body)
  if ("refused" in grown) return false
  if (grown.left.from !== undefined) over.held.set(grown.left.from, null)
  over.held.set(grown.left.path, grown.left.body)
  return true
}

function verdictOf(over: Over, one: FileChange): Verdict {
  const left = leftAlready(one, over.body)
  if (stepped(over, one)) return left ? "undecidable" : "takes"
  return left ? "landed" : "stale"
}

function judgingRecords(
  root: string,
  page: string,
  records: readonly KeptRecord[]
): readonly Judged[] {
  const over = overIn(root)
  const had = editsIn(root, page)
  if (!("why" in had)) for (const one of had.rows) stepped(over, one)
  const said: Judged[] = []
  for (const record of records) {
    if (record.edit === null) continue
    said.push({ record, verdict: verdictOf(over, record.edit) })
  }
  return said
}

function whySaid(one: Judged): string {
  if (one.verdict === "undecidable") return `${saidAbout(one.record)} — ${UNDECIDED}`
  if (one.verdict === "landed") return `${saidAbout(one.record)} — ${LANDED}`
  return `${saidAbout(one.record)} — ${STALE}`
}

function heldBack(every: readonly Judged[], unlanded: boolean): readonly string[] {
  const asks = !unlanded && every.some((one) => one.verdict === "undecidable")
  return [...every.map(whySaid), ...(asks ? [READ_FIRST] : []), DROP_INSTEAD, NOTHING_WENT]
}

function editsOf(every: readonly KeptRecord[]): readonly FileChange[] {
  return every.flatMap((one) => (one.edit === null ? [] : [one.edit]))
}

function taken(
  root: string,
  page: string,
  at: string,
  paths: readonly string[],
  unlanded: boolean
): Answer {
  const had = recordsKept(root, page)
  if (had.length === 0) return told([NOTHING_TAKEN])
  const bare = paths.length === 0
  const went = had.filter((one) => one.edit !== null && (bare || namedIn(one.edit, paths)))
  const missed = missedIn(paths, editsOf(went), TAKE_WORDS)
  if (missed.length > 0) return mistaking(missed)
  if (went.length === 0) return told([NO_EDIT_KEPT])
  const back = judgingRecords(root, page, went).filter(
    (one) => one.verdict !== "takes" && !(unlanded && one.verdict === "undecidable")
  )
  if (back.length > 0) return mistaking(heldBack(back, unlanded))
  const kept = appendEdits(root, page, editsOf(went))
  if ("why" in kept) return refusedBy([kept.why], OPERATIONAL)
  const left = had.filter((one) => !went.includes(one))
  put(
    root,
    at,
    left.map((one) => one.line)
  )
  const rest = left.length === 0 ? [] : [`${counted(left.length, "record")} ${STILL_KEPT}`]
  return told([...went.map(saidAbout), TAKEN, ...rest, APPLY_LANDS])
}

export function takingRecords(
  root: string,
  page: string,
  said: readonly string[],
  unlanded: boolean
): Answer {
  const paths = rootedAt(root, said)
  if (typeof paths === "string") return mistaking([paths])
  const at = seatEditsAt(page)
  if (at === null || !existsSync(join(root, at))) return told([NOTHING_TAKEN])
  try {
    return exclusively(join(root, at), (): Answer => taken(root, page, at, paths, unlanded))
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

export type Asked = {
  readonly paths: readonly string[]
  readonly unlanded: boolean
}

export function askedIn(piping: Piping, of: Words): Asked | string {
  const held = piping()
  if ("unreadable" in held && held.part === true) return held.unreadable
  if (!("bytes" in held) || held.bytes.byteLength === 0) return of.piped
  const lines: string[] = []
  let unlanded = false
  for (const line of new TextDecoder().decode(held.bytes).split("\n")) {
    const one = line.trim()
    if (one.startsWith(`${UNLANDED}:`)) {
      if (one.slice(UNLANDED.length + 1).trim() !== "true") return UNLANDED_VALUE
      unlanded = true
      continue
    }
    lines.push(line)
  }
  const paths = pathsSaid(lines.join("\n"), of)
  return typeof paths === "string" ? paths : { paths, unlanded }
}
