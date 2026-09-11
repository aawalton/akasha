import { join } from "node:path"
import { addressedIn, addressIn } from "akasha/pages/address/page-address.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  listedFor,
  valuesByPath,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"
const CODE_FILE = "code-file-property/"
const RUNNERS: Readonly<Record<string, string>> = { ts: "bun", sh: "bash" }
const ONE = 1
const LENIENT = "-"
const SPACE = " "

export type Start = {
  readonly code: string
  readonly before?: readonly string[]
  readonly pages?: readonly string[]
  readonly arguments?: readonly string[]
  readonly lenient?: boolean
}

export type Refused = { readonly refused: string }

export type Run = { readonly runner: string; readonly path: string }

export type Composed = { readonly command: string } | Refused

export function pathOf(root: string, named: string): string | Refused {
  const address = addressedIn(named)
  if ("refused" in address) return address
  const one = listedFor(root, address)
  if (one === null) {
    return { refused: `\`${named}\` names no page, so no command can be composed naming it` }
  }
  return one.path
}

function typeValueOf(root: string, pageTypeSlug: string): Value | null {
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    if (textAt(one.value, "slug") === pageTypeSlug) return one.value
  }
  return null
}

function requiredCodeIn(value: Value): readonly string[] {
  const declared = value.properties
  if (!Array.isArray(declared)) return []
  const found: string[] = []
  for (const one of declared) {
    if (one === null || typeof one !== "object") continue
    const held = one as Record<string, unknown>
    const named = held.pageProperty
    if (typeof named !== "string" || !named.startsWith(CODE_FILE)) continue
    if (held.required === true) found.push(named)
  }
  return found
}

export function runPropertyOf(root: string, pageTypeSlug: string): string | Refused {
  const value = typeValueOf(root, pageTypeSlug)
  if (value === null) {
    return {
      refused: `\`${pageTypeSlug}\` is no page type, so nothing says which file its pages run`,
    }
  }
  const found = requiredCodeIn(value)
  const one = found[0]
  if (found.length !== ONE || one === undefined) {
    return {
      refused: `\`${pageTypeSlug}\` requires ${found.length} code files, and a run needs the one to run`,
    }
  }
  const at = pathOf(root, one)
  if (typeof at !== "string") return at
  const held = valueAt(join(root, at), root)
  const propertySlug = held === null ? null : textAt(held, "propertySlug")
  if (propertySlug === null) {
    return { refused: `\`${one}\` states no property slug, so which file its pages run is unsaid` }
  }
  return propertySlug
}

export function runOf(root: string, named: string): Run | Refused {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    return { refused: `\`${named}\` names no page type, so which file it runs is not settled` }
  }
  const page = pathOf(root, named)
  if (typeof page !== "string") return page
  const propertySlug = runPropertyOf(root, address.pageTypeSlug)
  if (typeof propertySlug !== "string") return propertySlug
  const held = valuesByPath(root, address.pageTypeSlug).get(page)?.[propertySlug]
  if (typeof held !== "string") {
    return { refused: `\`${named}\` states no \`${propertySlug}\`, so no file beside it is run` }
  }
  const runner = RUNNERS[held]
  if (runner === undefined) {
    return {
      refused: `no program is known to run a file held as \`${held}\`, so \`${named}\` is not run`,
    }
  }
  const path = besideAt(page, propertySlug, held)
  if (path === null)
    return { refused: `\`${page}\` is no TypeScript page, so no file sits beside it` }
  return { runner, path }
}

export function commandOf(root: string, start: Start): Composed {
  const run = runOf(root, start.code)
  if ("refused" in run) return run
  const words: string[] = [...(start.before ?? []), run.runner, run.path]
  for (const named of start.pages ?? []) {
    const at = pathOf(root, named)
    if (typeof at !== "string") return at
    words.push(at)
  }
  words.push(...(start.arguments ?? []))
  return { command: `${start.lenient === true ? LENIENT : ""}${words.join(SPACE)}` }
}

export function wordsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const took: string[] = []
  for (const one of held) {
    if (typeof one !== "string") return null
    took.push(one)
  }
  return took.length === 0 ? null : took
}

export function startIn(held: unknown): Start | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const said = held as Record<string, unknown>
  const code = said.code
  if (typeof code !== "string") return null
  const before = wordsIn(said.before)
  const pages = wordsIn(said.pages)
  const words = wordsIn(said.arguments)
  return {
    code,
    ...(before === null ? {} : { before }),
    ...(pages === null ? {} : { pages }),
    ...(words === null ? {} : { arguments: words }),
    ...(said.lenient === true ? { lenient: true } : {}),
  }
}

export function startsIn(held: unknown): readonly Start[] | null {
  if (!Array.isArray(held)) return null
  const took: Start[] = []
  for (const one of held) {
    const said = startIn(one)
    if (said === null) return null
    took.push(said)
  }
  return took.length === 0 ? null : took
}

export function commandsOf(root: string, starts: readonly Start[]): readonly string[] | Refused {
  const found: string[] = []
  for (const one of starts) {
    const said = commandOf(root, one)
    if ("refused" in said) return said
    found.push(said.command)
  }
  return found
}
