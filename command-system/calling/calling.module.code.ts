import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { indexNamed, indexThere, listedAt, slugsOfType, typeSlugById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { HelpNotes } from "../commands/properties/help-notes.text-property.ts"
import type { Taking } from "../commands/properties/taking.record-property.ts"
import { saidBy } from "../fault-saying/fault-saying.module.code.ts"

export type Kind = {
  readonly slug: string
  readonly runsChecks: boolean
  readonly runsWarrants: boolean
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

const CHANGE_KIND = "changeKindSlug"

const RUNS_CHECKS = "runsChecks"

const RUNS_WARRANTS = "runsWarrants"

const CHANGE_KIND_TYPE = "01a05e11-d3f8-72af-b104-6cdd1255b0eb"

const TAKING = "taking"

const HELP_NOTES = "helpNotes"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const CODE = "code"

const TS = "ts"

export const ROOTED = "index"

export const ROOTED_AT = "akasha/command-system/commands/index/index.command.ts"

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

function widest(said: readonly string[]): number {
  return said.reduce((held, one) => (one.length > held ? one.length : held), 0)
}

function pageAt(root: string, slug: string): string | null {
  const said = commandSlugIn(root)
  const found = said === null ? [] : listedAt(root, said, slug)
  if (found.length === 1) return found[0]?.path ?? null
  return slug === ROOTED && existsSync(join(root, ROOTED_AT)) ? ROOTED_AT : null
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
  const warrants = page[RUNS_WARRANTS]
  if (typeof checks !== "boolean" || typeof warrants !== "boolean") return null
  return { slug, runsChecks: checks, runsWarrants: warrants }
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
  if (!Array.isArray(taking) || !Array.isArray(helpNotes)) return null
  return { taking: taking as Taking, helpNotes: helpNotes as readonly HelpNotes[] }
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

export function unreadIn(root: string, calledAs: string): string | null {
  const at = indexNamed()
  const said = `\`${calledAs} ${ROOTED}\` is found without the index and says what it can do.`
  if (!indexThere(root)) {
    return `No index stands at \`${at}\`, so no command was read. ${said}`
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
  path: string,
  root: string,
  argv: readonly string[],
  outside: Outside
): Promise<Answer> {
  const beside = besideAt(path, CODE, TS)
  if (beside === null) {
    return refusing(
      `\`${named}\` is a command page, and no code file can stand beside a name like it`
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
      report: helpOf(`${outside.calledAs} ${named}`, definitionOf(page), surface),
      refusals: [],
      code: 0,
    }
  }
  const answering = answeringOf(reached.mod, named)
  if (answering === null) {
    return refusing(
      `\`${named}\` is a command page, and ${beside} answers to nothing that can be called`
    )
  }
  const kind = outside.changeKind ?? kindOf(root, page)
  return await answering(argv, {
    root,
    calledAs: `${outside.calledAs} ${named}`,
    from: outside.from,
    writer: outside.writer,
    agentId: outside.agentId,
    ...(kind === null ? {} : { changeKind: kind }),
  })
}

export function everyIn(root: string): readonly string[] {
  const held = commandsIn(root)
  if (held.includes(ROOTED) || !existsSync(join(root, ROOTED_AT))) return held
  return [...held, ROOTED].sort()
}

function helping(root: string, outside: Outside): Answer {
  const every = everyIn(root)
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

export async function calling(argv: readonly string[], outside: Outside): Promise<Answer> {
  const root = resolve(outside.root)
  const named = argv[0]
  if (named === HELP || named === HELP_SHORT) return helping(root, outside)
  if (named === ROOTED) return answeredBy(named, ROOTED_AT, root, argv.slice(1), outside)
  const every = everyIn(root)
  const unread = unreadIn(root, outside.calledAs)
  const carried = (said: string): Answer => {
    const held = [said]
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
    return carried(`${outside.calledAs} takes a command, and none was named.`)
  }
  const type = commandSlugIn(root)
  const found = type === null ? [] : listedAt(root, type, named)
  const first = found[0]
  if (first === undefined) {
    return carried(
      unread === null
        ? `\`${named}\` is no command akasha carries.`
        : `\`${named}\` was looked for and not read.`
    )
  }
  if (found.length > 1) {
    const among = found.map((one) => `  ${one.path}`).join("\n")
    return refusing(
      `\`${named}\` is carried by ${found.length} commands, so this names more than one:\n${among}`
    )
  }
  return answeredBy(named, first.path, root, argv.slice(1), outside)
}
