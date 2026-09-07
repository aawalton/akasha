import { readFileSync } from "node:fs"
import { join } from "node:path"
import { agentPathOf } from "@akasha/context/warranting"
import { partedIn } from "@akasha/pages/page-file-name"
import { textAt, type Value } from "@akasha/pages/page-value"
import type {
  Edit,
  Answer as Said,
} from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  addedTo,
  ledgerAt,
  type World,
  worldAt,
} from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import {
  editsAt,
  foldedIn,
  keptAt,
  keptEdits,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Loaded,
  loadedAt,
  ranBy,
  runAt,
} from "../../../changes/runners/pages/change-running/change-running.change-runner.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "../../../command-system/argument-reading/argument-reading.module.code.ts"
import { mistaking, puttingUpSaid } from "../../../command-system/asking/asking.module.code.ts"
import {
  type Answer,
  type Given,
  HELP,
  HELP_SHORT,
  helpOf,
} from "../../../command-system/calling/calling.module.code.ts"
import {
  dropping,
  forgetting,
  listing,
  NO_PAGE,
  saidOf,
  taking,
  waitingSaid,
} from "../../../command-system/change-acting/change-acting.module.code.ts"
import {
  MESSAGE,
  unknownIn,
} from "../../../command-system/command-flags/command-flags.module.code.ts"
import type { Taking } from "../../../command-system/commands/properties/taking.record-property.ts"
import { whyOf } from "../../../command-system/fault-saying/fault-saying.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"
import { inputIn, type Piping } from "../../../command-system/piping/piping.module.code.ts"
import { offRepo, pathAt } from "../../../command-system/said-pathing/said-pathing.module.code.ts"
import { change as changePage } from "./change.command.ts"

export const PAGE_LANDING =
  "A subagent dispatched a moment ago can run before its page lands, and a landing refused leaves" +
  " that subagent with no page at all. Run this from a terminal to put the page up, then ask again:"

export function noPageSaid(root: string, agentId: string | null): string {
  return `${NO_PAGE}. ${PAGE_LANDING}\n  ${puttingUpSaid(root, agentId)}`
}

const BARE: readonly string[] = []

const BYTES = new TextEncoder()

const AT = "at"

const APPLY = "apply"

const NO_MESSAGE = "`apply` takes the commit message, and the message given is empty"

const CHANGE_COMMAND = "change-command"

const COMMAND_TYPES: readonly string[] = [
  CHANGE_COMMAND,
  "change-checked",
  "change-authored",
  "change-restated",
]

const DROP = "drop"

const DROP_TAKES = "the act taking away the edits kept, at the paths named or at every path"

const DEFINITION = "definition"

const READERS_OWE_READING = "readersOweReading"

const WRITER_OWES_READING = "writerOwesReading"

const DROP_SAID = "`drop` and `handed` and `take` and `forget` name an act rather than a change"

const HANDED = "handed"

const TAKE = "take"

const FORGET = "forget"

const HANDED_TAKES = "the act naming what each subagent handed to this agent"

const TAKE_TAKES = "the act taking one subagent's handed edits into this agent's own"

const FORGET_TAKES = "the act taking away one subagent's handed edits"

const NO_ARGUMENTS =
  "a change reads its arguments from standard input, and this call piped nothing in"

const NO_SUCH_PATH = "ENOENT"

export type Over = (world: World) => Promise<Said>

function textIn(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(join(root, path), "utf8")
    } catch (cause) {
      const said = cause instanceof Error && "code" in cause ? String(cause.code) : ""
      if (said !== NO_SUCH_PATH) throw cause
      return null
    }
  }
}

function worldFor(root: string, had: readonly Edit[], before: Said): World {
  const base = ledgerAt(root, textIn(root), runAt)
  return had.length === 0 ? base : addedTo(base, before)
}

export type Runs = {
  readonly slug: string
  readonly definition: string
}

export function changesIn(world: World): readonly Runs[] {
  const held: Runs[] = []
  for (const type of COMMAND_TYPES) {
    for (const one of world.index.everyOfType(type)) {
      const slug = partedIn(one.path)?.slug
      if (slug === undefined) continue
      const value = world.index.pageAt(type, slug)
      held.push({ slug, definition: (value === null ? null : textAt(value, DEFINITION)) ?? "" })
    }
  }
  return held.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function runsSaid(world: World): string {
  return changesIn(world)
    .map((one) => `\`${one.slug}\``)
    .join(", ")
}

export function takingOf(world: World): Taking {
  return [
    ...changesIn(world).map((one) => ({ said: one.slug, takes: one.definition })),
    { said: DROP, takes: DROP_TAKES },
    { said: HANDED, takes: HANDED_TAKES },
    { said: TAKE, takes: TAKE_TAKES },
    { said: FORGET, takes: FORGET_TAKES },
  ]
}

export function helping(root: string, calledAs: string): Answer {
  const surface = {
    taking: takingOf(worldAt(root, textIn(root), runAt)),
    helpNotes: changePage.helpNotes,
  }
  return { report: helpOf(calledAs, changePage.definition, surface), refusals: [], code: 0 }
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

export type Asked = { readonly message: string | null; readonly given: Arguments }

export function applyIn(given: Arguments): Asked | string {
  const said = given[APPLY]
  if (said === undefined) return { message: null, given }
  const message = said.trim()
  if (message === "") return NO_MESSAGE
  return {
    message,
    given: Object.fromEntries(Object.entries(given).filter(([key]) => key !== APPLY)),
  }
}

export function editsFor(rows: readonly Edit[]): readonly FileEdit[] {
  const held: FileEdit[] = []
  for (const one of rows) {
    const owed = one.readersOweReading
    if (one.from !== undefined && one.from !== one.path) {
      held.push({ path: one.from, body: null, readersOweReading: owed })
    }
    held.push({
      path: one.path,
      body: one.body === null ? null : BYTES.encode(one.body),
      readersOweReading: owed,
    })
  }
  return held
}

export function owedBy(value: Value | null): boolean {
  return value === null || value[READERS_OWE_READING] !== false
}

export function owingBy(value: Value | null): boolean {
  return value === null || value[WRITER_OWES_READING] !== false
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

function typeOf(world: World, slug: string): string {
  for (const one of COMMAND_TYPES) if (world.index.pageAt(one, slug) !== null) return one
  return CHANGE_COMMAND
}

export async function appending(
  root: string,
  page: string,
  over: Over,
  applied = false
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
    answer = {
      report: [
        ...said.edits.map(saidOf).sort(),
        ...(applied
          ? []
          : [`the edits are kept at ${keptAt(page) ?? ""}, and \`akasha apply\` lands them`]),
        ...waitingSaid(root, page),
      ],
      refusals: [],
      code: 0,
    }
    return [...had, ...said.edits]
  })
  if ("why" in kept) return { report: [], refusals: [kept.why], code: 3 }
  return answer
}

export type Loading = (world: World, at: string) => Promise<Loaded | string>

export type Applying = (message: string) => Promise<Answer>

const DROP_KEYS: readonly string[] = [AT, "path"]

const DROP_NAMES_NOTHING =
  "the lines piped in name no path, and a drop naming no path takes every edit kept away"

export function droppedIn(said: string): readonly string[] | string {
  const held: string[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const ends = one.indexOf(":")
    const key = ends === -1 ? "" : one.slice(0, ends).trim()
    const path = DROP_KEYS.includes(key) ? one.slice(ends + 1).trim() : one
    if (path === "") return `\`${one}\` names no path, so nothing went`
    held.push(path)
  }
  return held.length === 0 ? DROP_NAMES_NOTHING : held
}

export function droppedPathsIn(piping: Piping): readonly string[] | string {
  const held = piping()
  if (!("bytes" in held) || held.bytes.byteLength === 0) return BARE
  return droppedIn(new TextDecoder().decode(held.bytes))
}

function dropped(root: string, page: string, at: readonly string[], piping: Piping): Answer {
  const piped = droppedPathsIn(piping)
  if (typeof piped === "string") return mistaking([piped])
  return dropping(root, page, [...at, ...piped])
}

export async function changing(
  root: string,
  page: string,
  argv: readonly string[],
  piping: Piping,
  loading: Loading,
  applying: Applying
): Promise<Answer> {
  const world = worldAt(root, textIn(root), runAt)
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${runsSaid(world)}`, DROP_SAID])
  }
  if (slug === HANDED) return listing(root, page)
  if (slug === TAKE) return taking(root, page, argv[1])
  if (slug === FORGET) return forgetting(root, page, argv[1])
  if (slug === DROP) return dropped(root, page, argv.slice(1), piping)
  const unknown = unknownIn(argv.slice(1), BARE, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const said = argumentsIn(piping)
  if (typeof said === "string") return mistaking([said])
  const given = rootedIn(root, said)
  if (typeof given === "string") return mistaking([given])
  const asked = applyIn(given)
  if (typeof asked === "string") return mistaking([asked])
  const type = typeOf(world, slug)
  const loaded = await loading(world, `${type}/${slug}`)
  if (typeof loaded === "string") return mistaking([loaded, DROP_SAID])
  const held: Loaded = loaded
  const value = world.index.pageAt(type, slug)
  const owed = owedBy(value)
  const owing = owingBy(value)
  const message = asked.message
  const answered = await appending(
    root,
    page,
    async (one) => stamped(await ranBy(one, held, asked.given), owed, owing),
    message !== null
  )
  if (message === null || answered.code !== 0) return answered
  const landed = await applying(message)
  return {
    report: [...answered.report, ...landed.report],
    refusals: landed.refusals,
    code: landed.code,
  }
}

function applyingFor(given: Given): Applying {
  return async (message) => {
    const { apply } = await import("../apply/apply.command.code.ts")
    return await apply([MESSAGE, message], given)
  }
}

export async function change(argv: readonly string[], given: Given): Promise<Answer> {
  const first = argv[0]
  if (first === HELP || first === HELP_SHORT) return helping(given.root, given.calledAs)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await changing(given.root, page, argv, inputIn, loadedAt, applyingFor(given))
}
