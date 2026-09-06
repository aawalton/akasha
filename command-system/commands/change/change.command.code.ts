import { readFileSync } from "node:fs"
import { join } from "node:path"
import { agentPathOf } from "@akasha/context/warranting"
import { removePage } from "../../../changes/command/pages/remove-page/remove-page.change-command.code.ts"
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
import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { whyOf } from "../../fault-saying/fault-saying.module.code.ts"
import { gateBuilt } from "../../gate-building/gate-building.module.code.ts"
import type { FileEdit } from "../../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../../landing/landing.module.code.ts"
import { FILE_PATH, offRepo, pathAt, unknownIn, valuesOf } from "../write/write.command.code.ts"

const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const BARE: readonly string[] = []

const BYTES = new TextEncoder()

const RUNS_CHECKS = "runsChecks"

const CHANGE_COMMAND = "change-command"

const STILL_KEPT =
  "the edits are kept — mend what refused with more changes before `akasha apply` lands them"

const DROP = "drop"

const DROPPED = "these edits are gone, and no apply lands them"

const NOTHING_KEPT = "no edits are kept beside this agent's page, so nothing went"

export type Wrong = { readonly refusals: readonly string[] }

export type Over = (world: World) => Said

export type Option = {
  readonly slug: string
  readonly valued: readonly string[]
  readonly over: (root: string, argv: readonly string[]) => Over | Wrong
}

function onePathIn(root: string, argv: readonly string[]): { readonly path: string } | Wrong {
  const said = valuesOf(argv, FILE_PATH, [FILE_PATH])
  if (said.length === 0) {
    return { refusals: [`${FILE_PATH} names the path the change acts on, and none is given`] }
  }
  if (said.length > 1) {
    return {
      refusals: [
        `${FILE_PATH} is given ${String(said.length)} times, and one change names one path`,
      ],
    }
  }
  const one = said[0]
  if (one === undefined || one === null) {
    return { refusals: [`${FILE_PATH} takes a path, and none follows it`] }
  }
  const path = pathAt(root, one)
  return path === null ? { refusals: [offRepo(one)] } : { path }
}

export const OPTIONS: readonly Option[] = [
  {
    slug: "remove-page",
    valued: [FILE_PATH],
    over: (root, argv) => {
      const named = onePathIn(root, argv)
      if ("refusals" in named) return named
      return (world) => removePage(world, { at: named.path })
    },
  },
]

function optionFor(slug: string): Option | null {
  return OPTIONS.find((one) => one.slug === slug) ?? null
}

function optionsSaid(): string {
  return OPTIONS.map((one) => `\`${one.slug}\``).join(", ")
}

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

async function judgedSaid(root: string, rows: readonly Edit[]): Promise<readonly string[]> {
  const built = gateBuilt(root)
  if ("broken" in built) return [`no check ran — the checks would not load: ${built.broken}`]
  const change = changeOf(root, { base: baseOf(root), edits: editsFor(rows) })
  const said = await built.gate.over(change)
  if (said.length === 0) return ["every check judged the edits kept, and none refused"]
  return [...said.map((one) => `${one.path} — ${one.reason}`), STILL_KEPT]
}

function checkedIn(root: string, slug: string): boolean {
  const value = worldAt(root, textIn(root)).index.pageAt(CHANGE_COMMAND, slug)
  return value !== null && value[RUNS_CHECKS] === true
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

export async function appending(
  root: string,
  page: string,
  over: Over,
  checked: boolean
): Promise<Answer> {
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
  if (!checked || answer.code !== 0) return answer
  return { ...answer, report: [...answer.report, ...(await judgedSaid(root, kept.rows))] }
}

export async function changing(
  root: string,
  page: string,
  argv: readonly string[]
): Promise<Answer> {
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${optionsSaid()}`])
  }
  const rest = argv.slice(1)
  if (slug === DROP) {
    const said = unknownIn(rest, [], BARE)
    return said.length > 0 ? mistaking(said) : dropping(root, page)
  }
  const option = optionFor(slug)
  if (option === null) {
    return mistaking([
      `\`${slug}\` is no change this runs, which takes ${optionsSaid()}`,
      "`drop` takes away the edits kept, and is the one word here naming no change",
    ])
  }
  const unknown = unknownIn(rest, option.valued, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const over = option.over(root, rest)
  if ("refusals" in over) return mistaking(over.refusals)
  return await appending(root, page, over, checkedIn(root, slug))
}

export async function change(argv: readonly string[], given: Given): Promise<Answer> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) return mistaking([NO_PAGE])
  return await changing(given.root, page, argv)
}
