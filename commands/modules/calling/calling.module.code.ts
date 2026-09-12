import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { argumentsNamed } from "akasha/commands/arguments/argument-naming/argument-naming.module.code.ts"
import {
  DATA,
  INPUT,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  helpOf,
  rulesIn,
  surfaceOf,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"
import {
  definitionOf,
  type Levels,
  levelNamed,
  levelOfPart,
  levelsIn,
  levelsOf,
  valuedUnder,
} from "akasha/commands/modules/leveling/command-leveling.module.code.ts"
import {
  type Held,
  listingOf,
  partsOf,
} from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import {
  secondsIn,
  watching,
} from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import {
  type Level,
  pathOf,
  type Reached,
  saidIn,
  walkingIn,
} from "akasha/commands/modules/walking/command-walking.module.code.ts"
import { indexRefresh } from "akasha/commands/pages/index/refresh/index-refresh.command.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  idsNaming,
  indexNamed,
  indexThere,
  listedAt,
  listedById,
  slugsOfType,
  typeSlugById,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
import { meantSaid } from "akasha/utils/text/suggest-closest/suggest-closest.module.code.ts"

export type Kind = {
  readonly slug: string
  readonly runsChecks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

export type Outside = {
  readonly root: string
  readonly calledAs: string
  readonly from: string
  readonly writer: string | null
  readonly agentId: string | null
}

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export type Given = Outside

export type Answering = (argv: readonly string[], given: Given) => Answer | Promise<Answer>

export const HELP = "--help"

export const HELP_SHORT = "-h"

const RUNS_CHECKS = "runsChecks"

const WRITER_OWES_READING = "writerOwesReading"

const READERS_OWE_READING = "readersOweReading"

const CHANGE_KIND_TYPE = "01a05e11-d3f8-72af-b104-6cdd1255b0eb"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"

const INTENT_GROUP = "01a04e11-9f98-71e8-b821-77545c6be68e"

const INVARIANT_GROUP = "invariant-group"

const CODE = "code"

const TS = "ts"

const COMMAND = "command"

const SLASH = "/"

export const ROOTED = "index refresh"

const ROOTED_WORDS = ROOTED.split(" ")

export function refreshNamed(argv: readonly string[]): boolean {
  return ROOTED_WORDS.every((one, at) => argv[at] === one)
}

const loadFrom = createRequire(import.meta.url)

export function commandSlugIn(root: string): string | null {
  return indexThere(root) ? typeSlugById(root, COMMAND_TYPE) : null
}

export function slugsIn(root: string): readonly string[] {
  const said = commandSlugIn(root)
  return said === null ? [] : slugsOfType(root, said)
}

export function commandsIn(root: string): readonly string[] {
  const types = levelTypesIn(root)
  const named = levelNamed(levelsIn(root, types), types)
  return slugsIn(root).map((one) => pathOf(one, named))
}

export function reachedIn(
  at: string
): { readonly mod: Record<string, unknown> } | { readonly why: string } {
  try {
    return { mod: loadFrom(at) as Record<string, unknown> }
  } catch (thrown) {
    const why = saidBy(thrown)
    return { why: why.replace(/\s+/g, " ").trim() }
  }
}

function answeringOf(mod: Record<string, unknown>, slug: string): Answering | null {
  const named = mod[exportedAs(slug)]
  if (typeof named === "function") return named as Answering
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as Answering) : null
}

function listed(every: readonly string[], calledAs: string): string {
  return every.map((one) => `  ${calledAs} ${one}`).join("\n")
}

function pageAt(root: string, slug: string): string | null {
  const said = commandSlugIn(root)
  const found = said === null ? [] : listedAt(root, said, slug)
  return found.length === 1 ? (found[0]?.path ?? null) : null
}

function fileBeside(page: string): string | null {
  return besideAt(page, CODE, TS)
}

export function commandFileIn(root: string, slug: string): string | null {
  const page = pageAt(root, slug)
  return page === null ? null : fileBeside(page)
}

function pageIn(root: string, path: string, slug: string): Record<string, unknown> | null {
  const reached = reachedIn(join(root, path))
  if ("why" in reached) return null
  const page = reached.mod[exportedAs(slug)]
  if (typeof page !== "object" || page === null) return null
  return page as Record<string, unknown>
}

function kindPageAt(root: string, slug: string): string | null {
  const said = indexThere(root) ? typeSlugById(root, CHANGE_KIND_TYPE) : null
  const found = said === null ? [] : listedAt(root, said, slug)
  return found.length === 1 ? (found[0]?.path ?? null) : null
}

export function kindNamed(root: string, slug: string): Kind | null {
  const path = kindPageAt(root, slug)
  if (path === null) return null
  const page = pageIn(root, path, slug)
  if (page === null) return null
  const checks = page[RUNS_CHECKS]
  const owed = page[WRITER_OWES_READING]
  const stales = page[READERS_OWE_READING]
  if (typeof checks !== "boolean" || typeof owed !== "boolean" || typeof stales !== "boolean") {
    return null
  }
  return { slug, runsChecks: checks, writerOwesReading: owed, readersOweReading: stales }
}

export function unreadIn(root: string, outside: Outside): string | null {
  const at = indexNamed()
  const saying = (opened: string): string =>
    `${opened} Every command is found through the index, so none is read without one. ` +
    `Say \`${outside.calledAs} ${ROOTED}\`, which is answered without the index, ` +
    `and then say the call again.`
  if (!indexThere(root)) {
    return saying(`No index is at \`${at}\`, so no command was read.`)
  }
  if (commandSlugIn(root) === null) {
    return saying(
      `No page the index at \`${at}\` names carries the id \`${COMMAND_TYPE}\`, ` +
        `so nothing says which pages are commands.`
    )
  }
  if (slugsIn(root).length === 0) {
    return saying(`The index at \`${at}\` carries no command, so none was read.`)
  }
  return null
}

function rulesAbove(levels: Levels, above: readonly Level[]): readonly string[] {
  const held: string[] = []
  for (const one of above) {
    const value = valuedUnder(levels, `${one.type}${SLASH}${one.slug}`)?.value
    if (value !== undefined) held.push(...rulesIn(value))
  }
  return held
}

function notYetIn(root: string): ReadonlySet<string> {
  const found = new Set<string>()
  if (!indexThere(root)) return found
  for (const id of idsNaming(root, INTENT_GROUP, INVARIANT_GROUP)) {
    const slug = typeSlugById(root, id)
    if (slug !== null) found.add(slug)
  }
  return found
}

async function calledAt(
  level: Level,
  above: readonly Level[],
  said: string,
  root: string,
  argv: readonly string[],
  outside: Outside
): Promise<Answer> {
  const named = level.slug
  const beside = fileBeside(level.path)
  if (beside === null) {
    return refusedBy(
      [`\`${named}\` is a command page, and no code file can sit beside a name like it`],
      DATA
    )
  }
  const reached = reachedIn(join(root, beside))
  if ("why" in reached) {
    return refusedBy(
      [`\`${named}\` is a command page, and ${beside} could not be loaded — ${reached.why}`],
      DATA
    )
  }
  const page = pageIn(root, level.path, named)
  if (argv[0] === HELP || argv[0] === HELP_SHORT) {
    const surface = surfaceOf(page, notYetIn(root), argumentsNamed(root, page))
    if (surface !== null) {
      const rules = [
        ...rulesAbove(levelsIn(root, levelTypesIn(root)), above),
        ...(page === null ? [] : rulesIn(page)),
      ]
      return {
        report: helpOf(`${outside.calledAs} ${said}`, definitionOf(page), surface, rules),
        refusals: [],
        code: OK,
      }
    }
  }
  const answers = answeringOf(reached.mod, named)
  if (answers === null) {
    return refusedBy(
      [`\`${named}\` is a command page, and ${beside} answers to nothing that can be called`],
      DATA
    )
  }
  const calledAs = `${outside.calledAs} ${said}`
  const watch = watching(secondsIn(page), calledAs)
  try {
    return await answers(argv, {
      root,
      calledAs,
      from: outside.from,
      writer: outside.writer,
      agentId: outside.agentId,
    })
  } finally {
    watch.ended()
  }
}

function rootPageIn(root: string): Record<string, unknown> | null {
  const slug = commandSlugIn(root)
  if (slug === null) return null
  const found = listedById(root, COMMAND_TYPE)
  return found === null ? null : pageIn(root, found.path, slug)
}

function helping(root: string, outside: Outside): Answer {
  const unread = unreadIn(root, outside)
  const listing = listedUnder(root, rootPageIn(root), outside.calledAs, null)
  const report: string[] = listing === null ? [] : [...listing]
  if (unread !== null) report.push(unread)
  return { report, refusals: [], code: OK }
}

function walkedIn(root: string, argv: readonly string[]): Reached | null {
  const parts = partsOf(rootPageIn(root))
  if (parts.length === 0) return null
  const levels = levelsIn(root, levelTypesIn(root))
  return walkingIn(parts, argv, (part) => levelsOf(levels, part))
}

export function namespaceSlugIn(root: string): string | null {
  return indexThere(root) ? typeSlugById(root, NAMESPACE_TYPE) : null
}

function namedIn(root: string, every: readonly string[]): readonly string[] {
  const type = namespaceSlugIn(root)
  if (type === null) return every
  const types = levelTypesIn(root)
  const named = levelNamed(levelsIn(root, types), types)
  return [...every, ...slugsOfType(root, type).map((one) => pathOf(one, named))]
}

function levelTypesIn(root: string): readonly string[] {
  const held: string[] = []
  for (const one of [commandSlugIn(root), namespaceSlugIn(root)]) {
    if (one !== null) held.push(one)
  }
  return held
}

function heldUnder(root: string, page: Record<string, unknown> | null): readonly Held[] {
  const levels = levelsIn(root, levelTypesIn(root))
  const held: Held[] = []
  for (const part of partsOf(page)) {
    const one = levelOfPart(levels, part)
    if (one !== null) held.push(one)
  }
  return held
}

function listedUnder(
  root: string,
  page: Record<string, unknown> | null,
  under: string,
  definition: string | null
): readonly string[] | null {
  const held = heldUnder(root, page).map((one) => ({
    named: `${under} ${one.named}`,
    said: one.said,
  }))
  return listingOf(under, definition, held, HELP)
}

function pastIn(argv: readonly string[], held: number): readonly string[] {
  return argv.slice(held).filter((one) => one !== HELP && one !== HELP_SHORT)
}

function missedBy(
  under: string,
  past: readonly string[],
  held: readonly Held[]
): readonly string[] {
  const word = past[0] ?? ""
  const rest = past.length === 1 ? "" : `, so \`${past.join(" ")}\` reached nothing`
  const near = meantSaid(
    word,
    held.map((one) => one.named)
  )
  return [`\`${under}\` holds no \`${word}\`${rest}.${near}`, ""]
}

function namespaceSaid(
  root: string,
  reached: Reached,
  argv: readonly string[],
  calledAs: string
): Answer | null {
  const first = reached.found[0]
  if (reached.found.length !== 1 || first === undefined) return null
  const levels = levelsIn(root, levelTypesIn(root))
  const page = valuedUnder(levels, `${first.type}${SLASH}${first.slug}`)?.value ?? null
  const under = `${calledAs} ${saidIn(argv, reached.held)}`
  const listing = listedUnder(root, page, under, definitionOf(page))
  if (listing === null) return null
  const past = pastIn(argv, reached.held)
  if (past.length === 0) return { report: listing, refusals: [], code: OK }
  return refusedBy([...missedBy(under, past, heldUnder(root, page)), ...listing], INPUT)
}

export async function calling(argv: readonly string[], outside: Outside): Promise<Answer> {
  const before = opening()
  const root = resolve(outside.root)
  const named = argv[0]
  if (named === HELP || named === HELP_SHORT) return helping(root, outside)
  const unread = unreadIn(root, outside)
  if (unread !== null && refreshNamed(argv)) {
    return indexRefresh(argv.slice(ROOTED_WORDS.length), { ...outside, root })
  }
  const carried = (code: number, saying: (every: readonly string[]) => string): Answer => {
    const every = commandsIn(root)
    const held = [saying(every)]
    if (unread !== null) held.push(unread)
    if (every.length > 0) {
      held.push(
        `These are the commands it carries:\n${listed(every, outside.calledAs)}\n` +
          `Say \`${outside.calledAs} ${HELP}\` for what each of them takes.`
      )
    }
    return refusedBy([held.join(" ")], code)
  }
  if (named === undefined) {
    return carried(INPUT, () => `${outside.calledAs} takes a command, and none was named.`)
  }
  const reached = walkedIn(root, argv)
  const first = reached === null ? undefined : reached.found[0]
  if (reached === null || first === undefined || first.type !== commandSlugIn(root)) {
    const answered =
      reached === null || first === undefined || first.type !== namespaceSlugIn(root)
        ? null
        : namespaceSaid(root, reached, argv, outside.calledAs)
    if (answered !== null) return answered
    return unread === null
      ? carried(
          INPUT,
          (every) =>
            `\`${named}\` is no command akasha carries.${meantSaid(named, namedIn(root, every))}`
        )
      : carried(DATA, () => `\`${named}\` was looked for and not read.`)
  }
  if (reached.found.length > 1) {
    const among = reached.found.map((one) => `  ${one.path}`).join("\n")
    return refusedBy(
      [
        `\`${first.slug}\` is carried by ${reached.found.length} commands, ` +
          `so this names more than one:\n${among}`,
      ],
      DATA
    )
  }
  const answer = await calledAt(
    first,
    reached.above,
    saidIn(argv, reached.held),
    root,
    argv.slice(reached.held),
    outside
  )
  costRecorded(root, first.path, before, COMMAND, first.slug, 0, answer.refusals.length)
  return answer
}
