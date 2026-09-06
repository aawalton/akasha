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
import { FILE_PATH, offRepo, pathAt, unknownIn, valuesOf } from "../write/write.command.code.ts"

const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const BARE: readonly string[] = []

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

function saidOf(one: Edit): string {
  const came = one.from
  if (came !== undefined && came !== one.path) return `moves ${came} to ${one.path}`
  if (one.body === null) return `takes ${one.path} away`
  if (one.was === null) return `adds ${one.path}`
  return `changes ${one.path}`
}

export function appending(root: string, page: string, over: Over): Answer {
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
  return "why" in kept ? { report: [], refusals: [kept.why], code: 3 } : answer
}

export function changing(root: string, page: string, argv: readonly string[]): Answer {
  const slug = argv[0]
  if (slug === undefined) {
    return mistaking([`no change is named, and this runs one of ${optionsSaid()}`])
  }
  const option = optionFor(slug)
  if (option === null) {
    return mistaking([`\`${slug}\` is no change this runs, which takes ${optionsSaid()}`])
  }
  const rest = argv.slice(1)
  const unknown = unknownIn(rest, option.valued, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const over = option.over(root, rest)
  if ("refusals" in over) return mistaking(over.refusals)
  return appending(root, page, over)
}

export function change(argv: readonly string[], given: Given): Answer {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) return mistaking([NO_PAGE])
  return changing(given.root, page, argv)
}
