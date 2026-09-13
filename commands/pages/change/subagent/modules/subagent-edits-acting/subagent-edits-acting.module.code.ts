import { existsSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  CARRIED_AT,
  LEFT_BY,
  seatEditsAt,
} from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { editStated } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  missedIn,
  namedIn,
  rootedAt,
  saidOf,
  type Words,
  wording,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  ANSWER_CEILING,
  countLines,
} from "akasha/commands/modules/long-body/long-body.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { exclusively } from "akasha/files/modules/exclusive/exclusive.module.code.ts"
import { partFiled, partUnfiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { textIn } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import { textThere } from "akasha/utils/fs/modules/text-there/text-there.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

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

const NO_LANDING = "no command lands a record kept here, so landing one means drafting it again"

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

export function saidAbout(one: KeptRecord): string {
  const did = one.edit === null ? NO_EDIT : saidOf(one.edit)
  return `${String(one.at)}. ${one.leftBy ?? NO_SUBAGENT}, ${one.carriedAt ?? NO_TIME} — ${did}`
}

export function listingRecords(root: string, page: string): Answer {
  const held = recordsKept(root, page)
  if (held.length === 0) return told([NOTHING_HELD])
  return told([...held.map(saidAbout), READS_ONE, UNDECIDABLE, NO_LANDING])
}

function bodySaid(named: string, text: string): string {
  return `${named}, ${counted(countLines(text), "line")}\n${text}`
}

export function bodiesOf(one: KeptRecord): readonly string[] {
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

function put(root: string, page: string, at: string, lines: readonly string[]): undefined {
  const full = join(root, at)
  if (lines.length === 0) {
    rmSync(full, { force: true })
    partUnfiled(root, at)
    return undefined
  }
  writeFileSync(full, lines.map((one) => `${one}\n`).join(""))
  partFiled(root, page, at)
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
    page,
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
