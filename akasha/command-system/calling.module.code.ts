import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { slugsOfType, standingAt } from "../data-system/index/index-reading.module.code.ts"

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

export function calling(argv: readonly string[], outside: Outside): Answer {
  const root = resolve(outside.root)
  const every = commandsIn(root)
  const named = argv[0]
  if (named === undefined) {
    return refusing(
      `${outside.calledAs} takes a command, and none was named. These are the commands it carries:\n${listed(every, outside.calledAs)}`
    )
  }
  const standing = standingAt(root, COMMAND, named)
  const first = standing[0]
  if (first === undefined) {
    return refusing(
      `\`${named}\` is no command akasha carries. These are the commands it carries:\n${listed(every, outside.calledAs)}`
    )
  }
  if (standing.length > 1) {
    const among = standing.map((one) => `  ${one.path}`).join("\n")
    return refusing(
      `\`${named}\` is carried by ${standing.length} commands, so this names more than one:\n${among}`
    )
  }
  const at = codeBeside(join(root, first.path))
  const reached = reachedIn(at)
  if ("why" in reached) {
    return refusing(
      `\`${named}\` is a command page, and ${codeBeside(first.path)} could not be loaded — ${reached.why}`
    )
  }
  const answering = answeringOf(reached.mod, named)
  if (answering === null) {
    return refusing(
      `\`${named}\` is a command page, and ${codeBeside(first.path)} answers to nothing that can be called`
    )
  }
  return answering(argv.slice(1), {
    root,
    calledAs: `${outside.calledAs} ${named}`,
    from: outside.from,
    writer: outside.writer,
  })
}
