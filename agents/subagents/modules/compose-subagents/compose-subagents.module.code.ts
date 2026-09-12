import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyOfType, type Listed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "subagent-kind"

const DISPATCHED_AS = "dispatchedAs"

const PROMPT_KEY = "subagentPrompt"

const PROMPT_SLUG = "subagent-prompt"

const MODEL = "model"

const DEFINITION = "definition"

export type Definition = { description: string; prompt: string; model?: string }

function pageValueOf(root: string, path: string): Value {
  let held: Value | null
  try {
    held = valueAt(path, root)
  } catch (cause) {
    throw new Error(
      `${path} is a ${PAGE_TYPE} page and would not load, so what it dispatches could not be ` +
        `read: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  if (held === null) {
    throw new Error(
      `${path} is a ${PAGE_TYPE} page and answers to nothing a reader can take it from`
    )
  }
  return held
}

function describe(path: string, value: Value): string {
  const held = textAt(value, DEFINITION)
  if (held === null || held === "") {
    throw new Error(`${path} states no definition, and that is what a dispatcher reads to choose`)
  }
  return held
}

function brief(root: string, path: string, value: Value): string {
  const held = textAt(value, PROMPT_KEY)
  if (held === null || held === "") {
    throw new Error(`${path} states no \`${PROMPT_SLUG}\`, and a subagent boots on that alone`)
  }
  const beside = besideAt(path, PROMPT_SLUG, held)
  if (beside === null) {
    throw new Error(`${path} is no page a \`${PROMPT_SLUG}\` file can sit beside`)
  }
  if (!existsSync(join(root, beside))) {
    throw new Error(`${beside} is not there, and a subagent boots on that alone`)
  }
  const prompt = readFileSync(join(root, beside), "utf8").trim()
  if (prompt === "") throw new Error(`${beside} is empty, and a subagent boots on that alone`)
  return prompt
}

function kindsIn(root: string, listed: readonly Listed[]): Readonly<Record<string, Definition>> {
  const definitions: Record<string, Definition> = {}
  for (const one of listed) {
    const value = pageValueOf(root, one.path)
    const name = textAt(value, DISPATCHED_AS)
    if (name === null || name === "") {
      throw new Error(
        `${one.path} states no \`${DISPATCHED_AS}\`, so nothing names it where a seat dispatches`
      )
    }
    if (name in definitions) {
      throw new Error(
        `\`${name}\` is the name two kinds dispatch by, so which briefing it carries is unsettled`
      )
    }
    const model = textAt(value, MODEL)
    const description = describe(one.path, value)
    const prompt = brief(root, one.path, value)
    definitions[name] =
      model === null || model === "" ? { description, prompt } : { description, prompt, model }
  }
  return definitions
}

export function everyKind(): Readonly<Record<string, Definition>> {
  const root = rootFor(resolveRoots(), AKASHA)
  const listed: readonly Listed[] = everyOfType(root, PAGE_TYPE)
  if (listed.length === 0)
    throw new Error(`no \`${PAGE_TYPE}\` page is there, so there is no kind to render`)
  return kindsIn(
    root,
    [...listed].sort((one, two) => (one.path < two.path ? -1 : 1))
  )
}
