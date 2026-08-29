import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative, resolve } from "node:path"
import {
  indexIn,
  slugsOfType,
  standingAt,
} from "../pages-system/index/index-reading.module.code.ts"
import { exportedAs } from "../pages-system/page/page-export-name.module.code.ts"
import { besideAt } from "../pages-system/page/page-file-name.module.code.ts"

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

export type Answering = (argv: readonly string[], given: Given) => Answer

export type Taking = {
  readonly said: string
  readonly takes: string
}

export type Surface = {
  readonly taking: readonly Taking[]
  readonly notes: readonly string[]
}

export const HELP = "--help"

export const HELP_SHORT = "-h"

const SURFACE = "surface"

const DEFINITION = "definition"

const COMMAND = "command"

const CODE = "code"

const TS = "ts"

export const ROOTED = "index"

export const ROOTED_AT = "akasha/command-system/command/index/index.command.ts"

const reach_ = createRequire(import.meta.url)

export function answering(
  report: readonly string[],
  refusals: readonly string[],
  code: number
): Answer {
  return { report, refusals, code }
}

export function commandsIn(root: string): readonly string[] {
  return slugsOfType(root, COMMAND)
}

export function reachedIn(
  at: string
): { readonly mod: Record<string, unknown> } | { readonly why: string } {
  try {
    return { mod: reach_(at) as Record<string, unknown> }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
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
  const standing = standingAt(root, COMMAND, slug)
  if (standing.length === 1) return standing[0]?.path ?? null
  return slug === ROOTED && existsSync(join(root, ROOTED_AT)) ? ROOTED_AT : null
}

function definitionIn(root: string, path: string, slug: string): string | null {
  const reached = reachedIn(join(root, path))
  if ("why" in reached) return null
  const page = reached.mod[exportedAs(slug)]
  if (typeof page !== "object" || page === null) return null
  const said = (page as Record<string, unknown>)[DEFINITION]
  return typeof said === "string" ? said : null
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

function surfaceIn(mod: Record<string, unknown>): Surface | null {
  const held = mod[SURFACE]
  if (typeof held !== "object" || held === null) return null
  const said = held as { readonly taking?: unknown; readonly notes?: unknown }
  if (!Array.isArray(said.taking) || !Array.isArray(said.notes)) return null
  return held as Surface
}

export function helpOf(
  calledAs: string,
  definition: string | null,
  surface: Surface
): readonly string[] {
  const wide = widest(surface.taking.map((one) => one.said))
  const report = [definition === null ? calledAs : `${calledAs} — ${definition}`, ""]
  for (const one of surface.taking) report.push(`  ${one.said.padEnd(wide)}  ${one.takes}`)
  if (surface.notes.length > 0) report.push("", ...surface.notes)
  return report
}

function refusing(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
}

export function unreadIn(root: string, calledAs: string): string | null {
  const at = relative(root, indexIn(root))
  const said = `\`${calledAs} ${ROOTED}\` is found without the index and says what it can do.`
  if (!existsSync(indexIn(root))) {
    return `No index stands at \`${at}\`, so no command was read. ${said}`
  }
  if (commandsIn(root).length === 0) {
    return `The index at \`${at}\` carries no command, so none was read. ${said}`
  }
  return null
}

function answeredBy(
  named: string,
  path: string,
  root: string,
  argv: readonly string[],
  outside: Outside
): Answer {
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
  const surface = surfaceIn(reached.mod)
  if (surface !== null && (argv[0] === HELP || argv[0] === HELP_SHORT)) {
    return {
      report: helpOf(`${outside.calledAs} ${named}`, definitionIn(root, path, named), surface),
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
  return answering(argv, {
    root,
    calledAs: `${outside.calledAs} ${named}`,
    from: outside.from,
    writer: outside.writer,
    agentId: outside.agentId,
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

export function calling(argv: readonly string[], outside: Outside): Answer {
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
  const standing = standingAt(root, COMMAND, named)
  const first = standing[0]
  if (first === undefined) {
    return carried(
      unread === null
        ? `\`${named}\` is no command akasha carries.`
        : `\`${named}\` was looked for and not read.`
    )
  }
  if (standing.length > 1) {
    const among = standing.map((one) => `  ${one.path}`).join("\n")
    return refusing(
      `\`${named}\` is carried by ${standing.length} commands, so this names more than one:\n${among}`
    )
  }
  return answeredBy(named, first.path, root, argv.slice(1), outside)
}
