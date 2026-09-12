import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import {
  helpOf,
  rulesIn,
  surfaceOf,
} from "akasha/commands/modules/help-writing/help-writing.module.code.ts"
import {
  type Held,
  listingOf,
  partsOf,
  slugOfPart,
  underOf,
  widest,
} from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import {
  secondsIn,
  watching,
} from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import {
  type Reached,
  saidIn,
  walkingIn,
} from "akasha/commands/modules/walking/command-walking.module.code.ts"
import { indexRefresh } from "akasha/commands/pages/index/refresh/index-refresh.command.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  indexNamed,
  indexThere,
  listedAt,
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

const DEFINITION = "definition"

const RUNS_CHECKS = "runsChecks"

const WRITER_OWES_READING = "writerOwesReading"

const READERS_OWE_READING = "readersOweReading"

const CHANGE_KIND_TYPE = "01a05e11-d3f8-72af-b104-6cdd1255b0eb"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"

const CODE = "code"

const TS = "ts"

const COMMAND = "command"

const UNDER = "-"

const SPACE = " "

export const ROOTED = "index refresh"

const ROOTED_WORDS = ROOTED.split(" ")

export function refreshNamed(argv: readonly string[]): boolean {
  return ROOTED_WORDS.every((one, at) => argv[at] === one)
}

const loadFrom = createRequire(import.meta.url)

export function answering(
  report: readonly string[],
  refusals: readonly string[],
  code: number
): Answer {
  return { report, refusals, code }
}

export function refused(said: string, code: number): Answer {
  return { report: [], refusals: [said], code }
}

export function commandSlugIn(root: string): string | null {
  return indexThere(root) ? typeSlugById(root, COMMAND_TYPE) : null
}

export function commandsIn(root: string): readonly string[] {
  const said = commandSlugIn(root)
  return said === null ? [] : slugsOfType(root, said)
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

function definitionOf(page: Record<string, unknown> | null): string | null {
  const said = page === null ? null : page[DEFINITION]
  return typeof said === "string" ? said : null
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

function definitionIn(root: string, path: string, slug: string): string | null {
  return definitionOf(pageIn(root, path, slug))
}

function toldOf(root: string, every: readonly string[], calledAs: string): readonly string[] {
  const held = every.map((one) => {
    const path = pageAt(root, one)
    return {
      named: `${calledAs} ${one}`,
      said: path === null ? null : definitionIn(root, path, one),
    }
  })
  const wide = widest(held.map((one) => one.named))
  return held.map((one) =>
    one.said === null ? `  ${one.named}` : `  ${one.named.padEnd(wide)}  ${one.said}`
  )
}

function refusing(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
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
  if (commandsIn(root).length === 0) {
    return saying(`The index at \`${at}\` carries no command, so none was read.`)
  }
  return null
}

function rulesAbove(root: string, words: readonly string[]): readonly string[] {
  const type = namespaceSlugIn(root)
  if (type === null) return []
  const held: string[] = []
  for (let at = 1; at < words.length; at = at + 1) {
    const slug = words.slice(0, at).join(UNDER)
    const found = listedAt(root, type, slug)
    const one = found[0]
    if (found.length !== 1 || one === undefined) continue
    const page = pageIn(root, one.path, slug)
    if (page !== null) held.push(...rulesIn(page))
  }
  return held
}

async function answeredBy(
  named: string,
  said: string,
  path: string,
  root: string,
  argv: readonly string[],
  outside: Outside
): Promise<Answer> {
  const beside = fileBeside(path)
  if (beside === null) {
    return refusing(
      `\`${named}\` is a command page, and no code file can sit beside a name like it`
    )
  }
  const reached = reachedIn(join(root, beside))
  if ("why" in reached) {
    return refusing(
      `\`${named}\` is a command page, and ${beside} could not be loaded — ${reached.why}`
    )
  }
  const page = pageIn(root, path, named)
  const surface = surfaceOf(page)
  if (surface !== null && (argv[0] === HELP || argv[0] === HELP_SHORT)) {
    const rules = [...rulesAbove(root, said.split(SPACE)), ...(page === null ? [] : rulesIn(page))]
    return {
      report: helpOf(`${outside.calledAs} ${said}`, definitionOf(page), surface, rules),
      refusals: [],
      code: 0,
    }
  }
  const answers = answeringOf(reached.mod, named)
  if (answers === null) {
    return refusing(
      `\`${named}\` is a command page, and ${beside} answers to nothing that can be called`
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

function helping(root: string, outside: Outside): Answer {
  const every = commandsIn(root)
  const unread = unreadIn(root, outside)
  const report: string[] = []
  if (every.length > 0) {
    report.push(`${outside.calledAs} carries these commands:`, "")
    report.push(...toldOf(root, every, outside.calledAs))
    report.push("", `say \`${outside.calledAs} <command> ${HELP}\` for what one takes`)
  }
  if (unread !== null) report.push(unread)
  return { report, refusals: [], code: 0 }
}

function walkedIn(root: string, argv: readonly string[]): Reached | null {
  return walkingIn(root, commandSlugIn(root), argv)
}

export function namespaceSlugIn(root: string): string | null {
  return indexThere(root) ? typeSlugById(root, NAMESPACE_TYPE) : null
}

function namedIn(root: string, every: readonly string[]): readonly string[] {
  const type = namespaceSlugIn(root)
  return type === null ? every : [...every, ...slugsOfType(root, type)]
}

function saidOfPart(root: string, part: string): string | null {
  const slug = slugOfPart(part)
  for (const type of [commandSlugIn(root), namespaceSlugIn(root)]) {
    if (type === null) continue
    const found = listedAt(root, type, slug)
    const one = found[0]
    if (found.length === 1 && one !== undefined) return definitionIn(root, one.path, slug)
  }
  return null
}

function namespaceSaid(
  root: string,
  reached: Reached,
  said: string,
  calledAs: string
): readonly string[] | null {
  const first = reached.found[0]
  if (reached.found.length !== 1 || first === undefined) return null
  const page = pageIn(root, first.path, reached.named)
  const under = `${calledAs} ${said}`
  const held: Held[] = []
  for (const part of partsOf(page)) {
    const rest = underOf(reached.named, part)
    if (rest === null) continue
    held.push({ named: `${under} ${rest}`, said: saidOfPart(root, part) })
  }
  return listingOf(under, definitionOf(page), held, HELP)
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
  const carried = (saying: (every: readonly string[]) => string): Answer => {
    const every = commandsIn(root)
    const held = [saying(every)]
    if (unread !== null) held.push(unread)
    if (every.length > 0) {
      held.push(
        `These are the commands it carries:\n${listed(every, outside.calledAs)}\n` +
          `Say \`${outside.calledAs} ${HELP}\` for what each of them takes.`
      )
    }
    return refusing(held.join(" "))
  }
  if (named === undefined) {
    return carried(() => `${outside.calledAs} takes a command, and none was named.`)
  }
  const reached = walkedIn(root, argv)
  const first = reached === null ? undefined : reached.found[0]
  if (reached === null || first === undefined) {
    const under = walkingIn(root, namespaceSlugIn(root), argv)
    const listing =
      under === null ? null : namespaceSaid(root, under, saidIn(argv, under.held), outside.calledAs)
    if (listing !== null) return { report: listing, refusals: [], code: 0 }
    return carried((every) =>
      unread === null
        ? `\`${named}\` is no command akasha carries.${meantSaid(named, namedIn(root, every))}`
        : `\`${named}\` was looked for and not read.`
    )
  }
  if (reached.found.length > 1) {
    const among = reached.found.map((one) => `  ${one.path}`).join("\n")
    return refusing(
      `\`${reached.named}\` is carried by ${reached.found.length} commands, ` +
        `so this names more than one:\n${among}`
    )
  }
  const answer = await answeredBy(
    reached.named,
    saidIn(argv, reached.held),
    first.path,
    root,
    argv.slice(reached.held),
    outside
  )
  costRecorded(root, first.path, before, COMMAND, reached.named, 0, answer.refusals.length)
  return answer
}
