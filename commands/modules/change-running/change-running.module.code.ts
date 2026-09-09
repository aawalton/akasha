import { readFileSync } from "node:fs"
import { join } from "node:path"
import { type Loaded, ranBy, runAt } from "@akasha/changes/change-loading"
import { bodyIn, foldedIn, keptAt, keptEdits } from "@akasha/changes/edits-keeping"
import { decodeUtf8 } from "@akasha/code/utf8-body"
import { partedIn } from "@akasha/pages/page-file-name"
import { textAt, type Value } from "@akasha/pages/page-value"
import { changingOf, owedIn } from "akasha/context/modules/warranting/warranting.module.code.ts"
import { pathsOf, replayed } from "../../../changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Answer as Said,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import {
  addedTo,
  ledgerAt,
  type World,
  worldAt,
} from "../../../changes/modules/shadow/change-shadow.module.code.ts"
import { costRecorded, opening } from "../../../checks/modules/cost/check-cost.module.code.ts"
import { whyOf } from "../../../command-system/fault-saying/fault-saying.module.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "../argument-reading/argument-reading.module.code.ts"
import { mistaking, puttingUpSaid } from "../asking/asking.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import { NO_PAGE, saidOf, waitingSaid } from "../change-acting/change-acting.module.code.ts"
import { unknownIn } from "../flags/command-flags.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"
import { offRepo, pathAt } from "../said-pathing/said-pathing.module.code.ts"

export const PAGE_LANDING =
  "A subagent dispatched a moment ago can run before its page lands, and a landing refused leaves" +
  " that subagent with no page at all. Run this from a terminal to put the page up, then ask again:"

export function noPageSaid(root: string, agentId: string | null): string {
  return `${NO_PAGE}. ${PAGE_LANDING}\n  ${puttingUpSaid(root, agentId)}`
}

const BARE: readonly string[] = []

const BYTES = new TextEncoder()

const AT = "at"

const MESSAGE = "message"

const NO_MESSAGE = "`message` says what the commit is for, and this one is empty"

const COMMAND_TYPE = "change-agent"

const DEFINITION = "definition"

const READERS_OWE_READING = "readersOweReading"

const WRITER_OWES_READING = "writerOwesReading"

const CHANGE_KIND = "changeKind"

const KIND_TYPE = "change-kind"

const NO_ARGUMENTS =
  "a change reads its arguments from standard input, and this call piped nothing in"

const NO_SUCH_PATH = "ENOENT"

const NOT_TEXT = "is not text, and a change reads a body as text"

export type Over = (world: World) => Promise<Said>

function bytesIn(root: string, path: string): Uint8Array | null {
  try {
    return readFileSync(join(root, path))
  } catch (cause) {
    const said = cause instanceof Error && "code" in cause ? String(cause.code) : ""
    if (said !== NO_SUCH_PATH) throw cause
    return null
  }
}

export function textIn(root: string): (path: string) => string | null {
  return (path) => {
    const bytes = bytesIn(root, path)
    if (bytes === null) return null
    const text = decodeUtf8(bytes)
    if (text === null) throw new Error(`\`${path}\` ${NOT_TEXT}`)
    return text
  }
}

export function worldFor(root: string, had: readonly FileChange[], before: Said): World {
  const base = ledgerAt(root, bodyIn(root), runAt, textIn(root))
  return had.length === 0 ? base : addedTo(base, before)
}

export type Runs = {
  readonly slug: string
  readonly definition: string
}

export function changesIn(world: World): readonly Runs[] {
  const held: Runs[] = []
  for (const one of world.index.everyOfType(COMMAND_TYPE)) {
    const slug = partedIn(one.path)?.slug
    if (slug === undefined) continue
    const value = world.index.pageAt(COMMAND_TYPE, slug)
    held.push({ slug, definition: (value === null ? null : textAt(value, DEFINITION)) ?? "" })
  }
  return held.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function runsSaid(world: World): string {
  return changesIn(world)
    .map((one) => `\`${one.slug}\``)
    .join(", ")
}

export function argumentsIn(piping: Piping): Arguments | string {
  const held = piping()
  if ("tty" in held) return NO_ARGUMENTS
  if ("unreadable" in held) return `the arguments would not open: ${held.unreadable}`
  if (held.bytes.byteLength === 0) return NO_ARGUMENTS
  const read = readingIn(new TextDecoder().decode(held.bytes))
  return "refused" in read ? read.refused : read.given
}

export function rootedIn(root: string, given: Arguments): Arguments | string {
  const said = given[AT]
  if (said === undefined) return given
  const path = pathAt(root, said)
  return path === null ? offRepo(said) : { ...given, [AT]: path }
}

const DRAFT = "draft"

const DRAFT_TAKES = "`draft` takes `true` to keep the edits for a later apply, or `false` to apply"

const MEASURE = "measure"

const NO_MEASURE = "`measure` takes `true`, and this one says something else"

const BOTH_SAID =
  "`message` says what the commit is for, and `draft` declines the commit, so the two are refused"

const BOTH_MEASURED =
  "`measure` measures the landing, and `draft` declines the landing, so the two are refused"

export type Asked = {
  readonly message: string | null
  readonly drafts: boolean
  readonly measure: boolean
  readonly given: Arguments
}

function draftIn(said: string | undefined): boolean | string {
  if (said === undefined) return false
  const one = said.trim()
  if (one === "true") return true
  return one === "false" ? false : DRAFT_TAKES
}

function measureIn(said: string | undefined): boolean | string {
  if (said === undefined) return false
  return said.trim() === "true" ? true : NO_MEASURE
}

export function applyIn(given: Arguments): Asked | string {
  const drafts = draftIn(given[DRAFT])
  if (typeof drafts === "string") return drafts
  const measure = measureIn(given[MEASURE])
  if (typeof measure === "string") return measure
  const said = given[MESSAGE]
  if (drafts && said !== undefined) return BOTH_SAID
  if (drafts && measure) return BOTH_MEASURED
  const rest = Object.fromEntries(
    Object.entries(given).filter(([key]) => key !== MESSAGE && key !== DRAFT && key !== MEASURE)
  )
  if (said === undefined) return { message: null, drafts, measure, given: rest }
  const message = said.trim()
  if (message === "") return NO_MESSAGE
  return { message, drafts, measure, given: rest }
}

export function unwarrantedFor(
  root: string,
  agentId: string | null,
  rows: readonly FileChange[]
): readonly string[] {
  const after = replayed({ edits: rows, refused: null }, bodyIn(root))
  if ("refused" in after) return [after.refused]
  const edits = [...after].map(([path, body]) => ({
    path,
    body: typeof body === "string" ? BYTES.encode(body) : null,
  }))
  return owedIn(
    root,
    agentId,
    edits.map((one) => one.path),
    changingOf(root, edits)
  )
}

export function owedBy(value: Value | null): boolean {
  return value === null || value[READERS_OWE_READING] !== false
}

export function owingBy(value: Value | null): boolean {
  return value === null || value[WRITER_OWES_READING] !== false
}

export function kindOf(world: World, value: Value | null): Value | null {
  const slug = value === null ? null : textAt(value, CHANGE_KIND)
  return slug === null ? null : world.index.pageAt(KIND_TYPE, slug)
}

export function stamped(said: Said, owed: boolean, owing: boolean): Said {
  if (owed && owing) return said
  return {
    edits: said.edits.map((one) => ({
      ...one,
      ...(owed ? {} : { readersOweReading: false }),
      ...(owing ? {} : { writerOwesReading: false }),
    })),
    refused: said.refused,
  }
}

function typeOf(world: World, slug: string): string | null {
  return world.index.pageAt(COMMAND_TYPE, slug) === null ? null : COMMAND_TYPE
}

export async function appending(
  root: string,
  page: string,
  agentId: string | null,
  owing: boolean,
  over: Over
): Promise<Answer> {
  let answer: Answer = mistaking([NO_PAGE])
  const kept = await keptEdits(root, page, async (had) => {
    const before = foldedIn(had)
    if (before.refused !== null) {
      answer = { report: [], refusals: [before.refused], code: 3 }
      return had
    }
    let said: Said
    try {
      said = await over(worldFor(root, had, before))
    } catch (thrown) {
      answer = { report: [], refusals: [whyOf(thrown)], code: 3 }
      return had
    }
    if (said.refused !== null) {
      answer = { report: [], refusals: [said.refused], code: 1 }
      return had
    }
    const unread = owing ? unwarrantedFor(root, agentId, [...had, ...said.edits]) : []
    if (unread.length > 0) {
      answer = { report: [], refusals: unread, code: 3 }
      return had
    }
    answer = {
      report: [...said.edits.map(saidOf).sort(), ...waitingSaid(root, page)],
      refusals: [],
      code: 0,
    }
    return [...had, ...said.edits]
  })
  if ("why" in kept) return { report: [], refusals: [kept.why], code: 3 }
  return answer
}

export type Loading = (world: World, at: string) => Promise<Loaded | string>

export type Applying = (message: string | null, measure: boolean) => Promise<Answer>

const CHANGE = "change"

const KEPT = "and `akasha change apply` lands them once what refused is answered"

const LANDS = "and `akasha change apply` lands them"

function keptSaid(page: string, why: string): string {
  return `the edits are kept at ${keptAt(page) ?? ""}, ${why}`
}

export type Chosen = {
  readonly said: string
  readonly drafts: boolean | null
  readonly barred: readonly string[]
  readonly at: string
}

export function barredIn(given: Arguments, chosen: Chosen): readonly string[] {
  return chosen.barred
    .filter((key) => given[key] !== undefined)
    .map((key) => `\`${key}\` is no argument a ${chosen.said} takes`)
}

export async function changing(
  root: string,
  page: string,
  agentId: string | null,
  argv: readonly string[],
  piping: Piping,
  loading: Loading,
  applying: Applying,
  chosen: Chosen
): Promise<Answer> {
  const before = opening()
  const world = worldAt(root, bodyIn(root), runAt, textIn(root))
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${runsSaid(world)}`])
  }
  const unknown = unknownIn(argv.slice(1), BARE, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const said = argumentsIn(piping)
  if (typeof said === "string") return mistaking([said])
  const given = rootedIn(root, said)
  if (typeof given === "string") return mistaking([given])
  const wrong = barredIn(given, chosen)
  if (wrong.length > 0) return mistaking(wrong)
  const asked = applyIn(given)
  if (typeof asked === "string") return mistaking([asked])
  const drafts = chosen.drafts ?? asked.drafts
  const type = typeOf(world, slug)
  if (type === null) {
    return mistaking([`\`${slug}\` names no change, and this runs one of ${runsSaid(world)}`])
  }
  const loaded = await loading(world, `${type}/${slug}`)
  if (typeof loaded === "string") return mistaking([loaded])
  const held: Loaded = loaded
  const kind = kindOf(world, world.index.pageAt(type, slug))
  const owed = owedBy(kind)
  const owing = owingBy(kind)
  let paths = 0
  const answered = await appending(root, page, agentId, owing, async (one) => {
    const made = stamped(await ranBy(one, held, asked.given), owed, owing)
    paths = new Set(made.edits.flatMap(pathsOf)).size
    return made
  })
  costRecorded(root, chosen.at, before, CHANGE, slug, paths, answered.refusals.length)
  if (answered.code !== 0) return answered
  if (drafts) {
    return { ...answered, report: [...answered.report, keptSaid(page, LANDS)] }
  }
  const landed = await applying(asked.message, asked.measure)
  return {
    report: [
      ...answered.report,
      ...landed.report,
      ...(landed.code === 0 ? [] : [keptSaid(page, KEPT)]),
    ],
    refusals: landed.refusals,
    code: landed.code,
  }
}
