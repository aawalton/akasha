import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { indexNamed, indexThere, listedAt, slugsOfType, typeSlugById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { besideAt } from "@akasha/pages/page-file-name"
import { costRecorded, opening } from "../../checks/modules/check-cost/check-cost.module.code.ts"
import {
  type Reached,
  saidIn,
  walkingIn,
} from "../../commands/modules/command-walking/command-walking.module.code.ts"
import {
  type Held,
  listingOf,
  partsOf,
  slugOfPart,
  spaced,
  underOf,
  widest,
} from "../../commands/modules/namespace-listing/namespace-listing.module.code.ts"
import {
  secondsIn,
  watching,
} from "../../commands/modules/stopping/command-stopping.module.code.ts"
import type { HelpNotes } from "../../commands/properties/help-notes.text-property.ts"
import type { Taking } from "../../commands/properties/taking.record-property.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"

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
  readonly changeKind?: Kind
}

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export type Given = Outside

export type Answering = (argv: readonly string[], given: Given) => Answer | Promise<Answer>

export type Surface = {
  readonly taking: Taking
  readonly helpNotes: readonly HelpNotes[]
}

export const HELP = "--help"

export const HELP_SHORT = "-h"

const DEFINITION = "definition"

const CHANGE_KIND = "changeKind"

const RUNS_CHECKS = "runsChecks"

const WRITER_OWES_READING = "writerOwesReading"

const READERS_OWE_READING = "readersOweReading"

const CHANGE_KIND_TYPE = "01a05e11-d3f8-72af-b104-6cdd1255b0eb"

const TAKING = "taking"

const HELP_NOTES = "helpNotes"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"

const CODE = "code"

const TS = "ts"

const COMMAND = "command"

export const ROOTED = "index"

const REPAIR_AT = "commands/pages/index/index.command.code.ts"

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

function kindOf(root: string, page: Record<string, unknown> | null): Kind | null {
  const said = page === null ? null : page[CHANGE_KIND]
  return typeof said === "string" ? kindNamed(root, said) : null
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

function surfaceOf(page: Record<string, unknown> | null): Surface | null {
  if (page === null) return null
  const taking = page[TAKING]
  const helpNotes = page[HELP_NOTES]
  if (!Array.isArray(helpNotes)) return null
  return {
    taking: (Array.isArray(taking) ? taking : []) as Taking,
    helpNotes: helpNotes as readonly HelpNotes[],
  }
}

export function helpOf(
  calledAs: string,
  definition: string | null,
  surface: Surface
): readonly string[] {
  const wide = widest(surface.taking.map((one) => one.said))
  const report = [definition === null ? calledAs : `${calledAs} — ${definition}`, ""]
  for (const one of surface.taking) report.push(`  ${one.said.padEnd(wide)}  ${one.takes}`)
  if (surface.helpNotes.length > 0) report.push("", ...surface.helpNotes)
  return report
}

function refusing(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
}

export function rebuiltBy(root: string): string {
  return (
    `bun -e 'const a = (await import("${join(root, REPAIR_AT)}"))` +
    `.index(["refresh"], { root: "${root}" }); ` +
    `console.log([...a.report, ...a.refusals].join("\\n"))'`
  )
}

export function unreadIn(root: string, calledAs: string): string | null {
  const at = indexNamed()
  const said =
    `Every command is found through the index, \`${calledAs} ${ROOTED}\` among them, ` +
    `so none is found without one. This builds the index again without reading it:\n  ` +
    `${rebuiltBy(root)}`
  if (!indexThere(root)) {
    return `No index is at \`${at}\`, so no command was read. ${said}`
  }
  if (commandSlugIn(root) === null) {
    return (
      `No page the index at \`${at}\` names carries the id \`${COMMAND_TYPE}\`, ` +
      `so nothing says which pages are commands. ${said}`
    )
  }
  if (commandsIn(root).length === 0) {
    return `The index at \`${at}\` carries no command, so none was read. ${said}`
  }
  return null
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
    return {
      report: helpOf(`${outside.calledAs} ${said}`, definitionOf(page), surface),
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
  const kind = outside.changeKind ?? kindOf(root, page)
  const calledAs = `${outside.calledAs} ${said}`
  const watch = watching(secondsIn(page), calledAs)
  try {
    return await answers(argv, {
      root,
      calledAs,
      from: outside.from,
      writer: outside.writer,
      agentId: outside.agentId,
      ...(kind === null ? {} : { changeKind: kind }),
    })
  } finally {
    watch.ended()
  }
}

function helping(root: string, outside: Outside): Answer {
  const every = commandsIn(root)
  const unread = unreadIn(root, outside.calledAs)
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
    held.push({ named: `${under} ${spaced(rest)}`, said: saidOfPart(root, part) })
  }
  return listingOf(under, definitionOf(page), held, HELP)
}

export async function calling(argv: readonly string[], outside: Outside): Promise<Answer> {
  const before = opening()
  const root = resolve(outside.root)
  const named = argv[0]
  if (named === HELP || named === HELP_SHORT) return helping(root, outside)
  const carried = (saying: (unread: string | null) => string): Answer => {
    const every = commandsIn(root)
    const unread = unreadIn(root, outside.calledAs)
    const held = [saying(unread)]
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
    return carried((unread) =>
      unread === null
        ? `\`${named}\` is no command akasha carries.`
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
