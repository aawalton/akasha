import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative, resolve } from "node:path"
import { indexIn, slugsOfType, standingAt } from "../data-system/index/index-reading.module.code.ts"

export type Outside = {
  readonly root: string
  readonly calledAs: string
  readonly from: string
  readonly writer: string | null
}

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export type Given = Outside

export type Answering = (argv: readonly string[], given: Given) => Answer

const COMMAND = "command"

export const ROOTED = "index"

export const ROOTED_AT = "akasha/command-system/command/index/index.command.ts"

const reach_ = createRequire(import.meta.url)

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

export function codeBeside(path: string): string {
  return `${path.slice(0, -".ts".length)}.code.ts`
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
  const named = mod[camel(slug)]
  if (typeof named === "function") return named as Answering
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as Answering) : null
}

function listed(every: readonly string[], calledAs: string): string {
  return every.map((one) => `  ${calledAs} ${one}`).join("\n")
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
  const reached = reachedIn(codeBeside(join(root, path)))
  if ("why" in reached) {
    return refusing(
      `\`${named}\` is a command page, and ${codeBeside(path)} could not be loaded — ${reached.why}`
    )
  }
  const answering = answeringOf(reached.mod, named)
  if (answering === null) {
    return refusing(
      `\`${named}\` is a command page, and ${codeBeside(path)} answers to nothing that can be called`
    )
  }
  return answering(argv, {
    root,
    calledAs: `${outside.calledAs} ${named}`,
    from: outside.from,
    writer: outside.writer,
  })
}

export function everyIn(root: string): readonly string[] {
  const held = commandsIn(root)
  if (held.includes(ROOTED) || !existsSync(join(root, ROOTED_AT))) return held
  return [...held, ROOTED].sort()
}

export function calling(argv: readonly string[], outside: Outside): Answer {
  const root = resolve(outside.root)
  const named = argv[0]
  if (named === ROOTED) return answeredBy(named, ROOTED_AT, root, argv.slice(1), outside)
  const every = everyIn(root)
  const unread = unreadIn(root, outside.calledAs)
  const carried = (said: string): Answer => {
    const held = [said]
    if (unread !== null) held.push(unread)
    if (every.length > 0) {
      held.push(`These are the commands it carries:\n${listed(every, outside.calledAs)}`)
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
