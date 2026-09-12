import { readFileSync } from "node:fs"
import { join } from "node:path"
import { pathsOf, replayed } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Answer as Said,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  bodyIn,
  foldedIn,
  keptAt,
  keptEdits,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  addedTo,
  ledgerAt,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  helpAsked,
  helpOfChange,
  type Loaded,
  ranBy,
  runAt,
  takesSaid,
} from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { decodeUtf8 } from "akasha/code/utf8-body/utf8-body.module.code.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  NO_PAGE,
  saidOf,
  stalling,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { underIts } from "akasha/commands/modules/change-ceiling/change-ceiling.module.code.ts"
import { commandPageAt } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import { unknownIn } from "akasha/commands/modules/flags/command-flags.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  offRepo,
  pathAt,
  underGitIn,
} from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import {
  changingOf,
  owedIn,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"
import { meantSaid } from "akasha/utils/text/suggest-closest/suggest-closest.module.code.ts"

const BARE: readonly string[] = []

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

const IS_A_FOLDER = "EISDIR"

const NO_BODY: ReadonlySet<string> = new Set([NO_SUCH_PATH, IS_A_FOLDER])

const NOT_TEXT = "is not text, and a change reads a body as text"

export type Over = (world: World) => Promise<Said>

function bytesIn(root: string, path: string): Uint8Array | null {
  try {
    return readFileSync(join(root, path))
  } catch (cause) {
    const said = cause instanceof Error && "code" in cause ? String(cause.code) : ""
    if (!NO_BODY.has(said)) throw cause
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
  return namesDrawn(changesIn(world).map((one) => one.slug))
}

export type Piped = { readonly text: string } | { readonly why: string } | { readonly none: true }

export function pipedIn(piping: Piping): Piped {
  const held = piping()
  if ("tty" in held) return { none: true }
  if ("unreadable" in held) return { why: `the arguments would not open: ${held.unreadable}` }
  if (held.bytes.byteLength === 0) return { none: true }
  return { text: new TextDecoder().decode(held.bytes) }
}

export function argumentsIn(piping: Piping): Arguments | string {
  const held = pipedIn(piping)
  if ("none" in held) return NO_ARGUMENTS
  if ("why" in held) return held.why
  const read = readingIn(held.text)
  return "refused" in read ? read.refused : read.given
}

const LINE_BREAK = /[\n\r]/

const MANY_LINES =
  "`at` names one path, and this one runs over more than one line — a fence hands its whole" +
  " body over, so name the path on the `at` line itself"

export function rootedIn(root: string, given: Arguments): Arguments | string {
  const held = given[AT]
  if (held === undefined) return given
  const said = held.trim()
  if (LINE_BREAK.test(said)) return MANY_LINES
  const path = pathAt(root, said)
  if (path === null) return offRepo(said)
  const under = underGitIn(path)
  return under === null ? { ...given, [AT]: path } : under
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

export function pathsNamedBy(
  every: Iterable<string>,
  asked: readonly FileChange[]
): readonly string[] {
  const named = new Set(asked.flatMap(pathsOf))
  return [...every].filter((one) => named.has(one))
}

export function unwarrantedFor(
  root: string,
  agentId: string | null,
  rows: readonly FileChange[],
  asked: readonly FileChange[]
): readonly string[] {
  const after = replayed({ edits: rows, refused: null }, bodyIn(root))
  if ("refused" in after) return [after.refused]
  const edits = [...after].map(
    ([path, body]): FileChange =>
      typeof body === "string" ? { kind: "add", path, content: body } : { kind: "remove", path }
  )
  return owedIn(root, agentId, pathsNamedBy(after.keys(), asked), changingOf(root, edits))
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
      answer = refusedBy([before.refused], DATA)
      return had
    }
    let said: Said
    try {
      said = await over(worldFor(root, had, before))
    } catch (thrown) {
      answer = stalling(root, had, thrown)
      return had
    }
    if (said.refused !== null) {
      answer = mistaking([said.refused])
      return had
    }
    const unread = owing ? unwarrantedFor(root, agentId, [...had, ...said.edits], said.edits) : []
    if (unread.length > 0) {
      answer = mistaking(unread)
      return had
    }
    answer = told(said.edits.map(saidOf).sort())
    return [...had, ...said.edits]
  })
  if ("why" in kept) return refusedBy([kept.why], OPERATIONAL)
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

const ANSWERED_NOTHING = "answered no edit, so the edits kept are as they were"

function nothingSaid(slug: string, paths: number): readonly string[] {
  return paths === 0 ? [`\`${slug}\` ${ANSWERED_NOTHING}`] : []
}

export type Chosen = {
  readonly said: string
  readonly drafts: boolean | null
  readonly barred: readonly string[]
  readonly slug: string
  readonly calledAs: string
}

export function barredIn(given: Arguments, chosen: Chosen): readonly string[] {
  return chosen.barred
    .filter((key) => given[key] !== undefined)
    .map((key) => `\`${key}\` is no argument a ${chosen.said} takes`)
}

async function sayingWhat(
  world: World,
  loading: Loading,
  type: string,
  slug: string,
  chosen: Chosen,
  helps: boolean
): Promise<Answer> {
  const loaded = await loading(world, `${type}/${slug}`)
  if (typeof loaded === "string") return mistaking([loaded])
  const takes = loaded.takes
  if (!helps) return mistaking([`${NO_ARGUMENTS}${takesSaid(slug, takes)}`])
  const stated = world.index.pageAt(type, slug)
  const definition = stated === null ? null : textAt(stated, DEFINITION)
  return told(helpOfChange(chosen.calledAs, slug, definition, takes))
}

export async function changing(
  root: string,
  page: string,
  agentId: string | null,
  argv: readonly string[],
  piping: Piping,
  loading: Loading,
  applying: Applying,
  chosen: Chosen,
  done: string[] = []
): Promise<Answer> {
  const before = opening()
  const world = worldAt(root, bodyIn(root), runAt, textIn(root))
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${runsSaid(world)}`])
  }
  const unknown = unknownIn(argv.slice(1), BARE, BARE, chosen.calledAs)
  if (unknown.length > 0) return mistaking(unknown)
  const piped = pipedIn(piping)
  if ("why" in piped) return mistaking([piped.why])
  const type = typeOf(world, slug)
  if (type === null) {
    const every = changesIn(world).map((one) => one.slug)
    return mistaking([
      `\`${slug}\` names no change, and this runs one of ${namesDrawn(every)}.` +
        meantSaid(slug, every),
    ])
  }
  if ("none" in piped) return await sayingWhat(world, loading, type, slug, chosen, false)
  if (helpAsked(piped.text)) return await sayingWhat(world, loading, type, slug, chosen, true)
  const read = readingIn(piped.text)
  if ("refused" in read) return mistaking([read.refused])
  const given = rootedIn(root, read.given)
  if (typeof given === "string") return mistaking([given])
  const wrong = barredIn(given, chosen)
  if (wrong.length > 0) return mistaking(wrong)
  const asked = applyIn(given)
  if (typeof asked === "string") return mistaking([asked])
  const drafts = chosen.drafts ?? asked.drafts
  const loaded = await loading(world, `${type}/${slug}`)
  if (typeof loaded === "string") return mistaking([loaded])
  const held: Loaded = loaded
  const stated = world.index.pageAt(type, slug)
  const kind = kindOf(world, stated)
  const owed = owedBy(kind)
  const owing = owingBy(kind)
  let paths = 0
  const answered = await appending(root, page, agentId, owing, async (one) =>
    underIts(slug, stated, async () => {
      const made = stamped(await ranBy(one, held, asked.given), owed, owing)
      paths = new Set(made.edits.flatMap(pathsOf)).size
      return made
    })
  )
  if (answered.report.length > 0) done.push(keptSaid(page, LANDS))
  costRecorded(
    root,
    commandPageAt(root, chosen.slug),
    before,
    CHANGE,
    slug,
    paths,
    answered.refusals.length
  )
  if (answered.code !== 0) return answered
  const nothing = nothingSaid(slug, paths)
  if (drafts) return told([...answered.report, ...nothing, keptSaid(page, LANDS)])
  const landed = await applying(asked.message, asked.measure)
  return answeredWith(
    [
      ...answered.report,
      ...nothing,
      ...landed.report,
      ...(landed.code === 0 ? [] : [keptSaid(page, KEPT)]),
    ],
    landed.refusals,
    landed.code
  )
}
