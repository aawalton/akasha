import { readFileSync } from "node:fs"
import { join } from "node:path"
import { agentPathOf } from "@akasha/context/warranting"
import { partedIn } from "@akasha/pages/page-file-name"
import type {
  Edit,
  Answer as Said,
} from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  type World,
  worldAt,
  worldOver,
} from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import {
  editsAt,
  foldedIn,
  keptEdits,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Loaded,
  loadedAt,
  ranBy,
} from "../../../changes/runners/pages/change-running/change-running.change-runner.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "../../argument-reading/argument-reading.module.code.ts"
import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"
import { gateBuilt } from "../../gate-building/gate-building.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../../landing/landing.module.code.ts"
import { inputIn, type Piping } from "../../piping/piping.module.code.ts"
import { offRepo, pathAt, unknownIn } from "../write/write.command.code.ts"

const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const BARE: readonly string[] = []

const BYTES = new TextEncoder()

const AT = "at"

const RUNS_CHECKS = "runsChecks"

const CHANGE_COMMAND = "change-command"

// A change reached from the command line is typed for the kind that change is, and the old
// `change-command` is the type those kinds replace, so a slug is looked for under each of them
// until no page is left carrying the old type.
const COMMAND_TYPES: readonly string[] = [CHANGE_COMMAND, "change-checked", "change-authored"]

const STILL_KEPT =
  "the edits are kept — mend what refused with more changes before `akasha apply` lands them"

const DROP = "drop"

const DROPPED = "these edits are gone, and no apply lands them"

const NOTHING_KEPT = "no edits are kept beside this agent's page, so nothing went"

const DROP_SAID = "`drop` takes away the edits kept, and is the one word here naming no change"

const NO_ARGUMENTS =
  "a change reads its arguments from standard input, and this call piped nothing in"

export type Over = (world: World) => Said

function textIn(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(join(root, path), "utf8")
    } catch {
      return null
    }
  }
}

function worldFor(root: string, had: readonly Edit[], before: Said): World {
  const base = worldAt(root, textIn(root))
  return had.length === 0 ? base : worldOver(base, before)
}

export function runsSaid(world: World): string {
  const held = COMMAND_TYPES.flatMap((type) =>
    [...world.index.everyOfType(type)]
      .map((one) => partedIn(one.path)?.slug ?? null)
      .filter((one): one is string => one !== null)
  )
  return [...held]
    .sort()
    .map((one) => `\`${one}\``)
    .join(", ")
}

// The arguments are text a caller piped in rather than flags, so a body carrying a quote or a
// backslash reaches the change as the caller wrote the body and nothing is escaped on the way.
export function argumentsIn(piping: Piping): Arguments | string {
  const held = piping()
  if ("tty" in held) return NO_ARGUMENTS
  if ("unreadable" in held) return `the arguments would not open: ${held.unreadable}`
  if (held.bytes.byteLength === 0) return NO_ARGUMENTS
  const read = readingIn(new TextDecoder().decode(held.bytes))
  return "refused" in read ? read.refused : read.given
}

// A path is the one argument this command reads rather than the change, because a change knows
// nothing of where the repository sits and every change naming a path names that path as `at`.
export function rootedIn(root: string, given: Arguments): Arguments | string {
  const said = given[AT]
  if (said === undefined) return given
  const path = pathAt(root, said)
  return path === null ? offRepo(said) : { ...given, [AT]: path }
}

// A change states whether the checks run over it, so a partial costs nothing here. The edits kept
// are judged as a whole rather than one at a time, because that whole is what an apply lands.
export function editsFor(rows: readonly Edit[]): readonly FileEdit[] {
  const held: FileEdit[] = []
  for (const one of rows) {
    if (one.from !== undefined && one.from !== one.path) held.push({ path: one.from, body: null })
    held.push({ path: one.path, body: one.body === null ? null : BYTES.encode(one.body) })
  }
  return held
}

// A slug names one page under one of the types a command change carries, and a slug naming none
// reads as the old type, so the refusal a caller sees for a name that is nowhere stays what it was.
function typeOf(world: World, slug: string): string {
  for (const one of COMMAND_TYPES) if (world.index.pageAt(one, slug) !== null) return one
  return CHANGE_COMMAND
}

function saidOf(one: Edit): string {
  const came = one.from
  if (came !== undefined && came !== one.path) return `moves ${came} to ${one.path}`
  if (one.body === null) return `takes ${one.path} away`
  if (one.was === null) return `adds ${one.path}`
  return `changes ${one.path}`
}

// A drop is the only way out of the edits kept, so the paths that went are said rather than counted.
export function dropping(root: string, page: string): Answer {
  let went: readonly string[] = []
  const dropped = keptEdits(root, page, (had) => {
    went = had.map(saidOf).sort()
    return null
  })
  if ("why" in dropped) return { report: [], refusals: [dropped.why], code: 3 }
  if (went.length === 0) return { report: [NOTHING_KEPT], refusals: [], code: 0 }
  return { report: [...went, DROPPED], refusals: [], code: 0 }
}

export async function appending(root: string, page: string, over: Over): Promise<Answer> {
  let answer: Answer = mistaking([NO_PAGE])
  const kept = keptEdits(root, page, (had) => {
    const before = foldedIn(had)
    if (before.refused !== null) {
      answer = { report: [], refusals: [before.refused], code: 3 }
      return had
    }
    let said: Said
    try {
      said = over(worldFor(root, had, before))
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
        `the edits are kept at ${editsAt(page) ?? ""}, and \`akasha apply\` lands them`,
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

// The change is loaded before the turn over the edits is taken, because loading reaches the disk
// and the turn holds every other caller out while the turn runs.
export async function changing(
  root: string,
  page: string,
  argv: readonly string[],
  piping: Piping,
  loading: Loading
): Promise<Answer> {
  const world = worldAt(root, textIn(root))
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${runsSaid(world)}`, DROP_SAID])
  }
  const unknown = unknownIn(argv.slice(1), BARE, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  if (slug === DROP) return dropping(root, page)
  const said = argumentsIn(piping)
  if (typeof said === "string") return mistaking([said])
  const given = rootedIn(root, said)
  if (typeof given === "string") return mistaking([given])
  const loaded = await loading(world, `${typeOf(world, slug)}/${slug}`)
  if (typeof loaded === "string") return mistaking([loaded, DROP_SAID])
  const held: Loaded = loaded
  return await appending(root, page, (one) => ranBy(one, held, given))
}

export async function change(argv: readonly string[], given: Given): Promise<Answer> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) return mistaking([NO_PAGE])
  return await changing(given.root, page, argv, inputIn, loadedAt)
}
