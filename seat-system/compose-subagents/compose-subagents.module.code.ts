export const tool = {
  summary: "Render the delegate definitions the `claude --agents` flag takes",
  path: "seat subagents",
} as const

import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fail } from "@akasha/command-system/command-failing"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  everyOfType,
  type Listed,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { besideAt } from "../../pages-system/pages/file-name/page-file-name.module.code.ts"
import {
  textAt,
  type Value,
  valueAt,
} from "../../pages-system/pages/value/page-value.module.code.ts"

const PAGE_TYPE = "subagent-kind"

// The name a seat dispatches a kind by. The page type carried this as a gap until
// \`dispatched-as\` closed it, so it is a property here rather than a slug to parse.
const DISPATCHED_AS = "dispatchedAs"

// The prompt is a file property: the page states the extension, and the file stands beside it.
const PROMPT_KEY = "subagentPrompt"

const PROMPT_SLUG = "subagent-prompt"

const MODEL = "model"

const DEFINITION = "definition"

const HELP = `compose-subagents — render the delegate definitions the client takes

Every \`${PAGE_TYPE}\` page that stands, as the JSON object the client's \`--agents\` flag takes:
a map of the name a seat dispatches by to its definition, its prompt, and the model it runs on
where it states one.

A kind's definition is what a dispatcher reads to choose, so the definition the page states is
what lands in the map. A kind's prompt is the whole of what its subagent starts with, and it
stands in the \`${PROMPT_SLUG}\` file beside the page rather than in the page.

Usage:
  bun seat-system/compose-subagents/compose-subagents.module.code.ts [--out <path>]

Flags:
  --out <path>   Write there rather than to stdout.
  --help         This.
`

function parse(argv: readonly string[]): { readonly out: string | null } {
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--help") {
      process.stdout.write(HELP)
      process.exit(0)
    }
    if (arg === "--out") {
      const value = argv[i + 1]
      if (value === undefined) fail("`--out` takes a value")
      i += 1
      out = value
    } else fail(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  return { out }
}

export type Definition = { description: string; prompt: string; model?: string }

function valueOf(root: string, path: string): Value {
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
    throw new Error(`${path} is no page a \`${PROMPT_SLUG}\` file can stand beside`)
  }
  if (!existsSync(join(root, beside))) {
    throw new Error(`${beside} is not there, and a subagent boots on that alone`)
  }
  const prompt = readFileSync(join(root, beside), "utf8").trim()
  if (prompt === "") throw new Error(`${beside} is empty, and a subagent boots on that alone`)
  return prompt
}

export function kindsIn(
  root: string,
  standing: readonly Listed[]
): Readonly<Record<string, Definition>> {
  const definitions: Record<string, Definition> = {}
  for (const one of standing) {
    const value = valueOf(root, one.path)
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

function main(): void {
  const { out } = parse(process.argv.slice(2))
  const root = rootFor(resolveRoots(), AKASHA)
  let standing: readonly Listed[]
  try {
    standing = everyOfType(root, PAGE_TYPE)
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
  // An index naming none is not a cast of none: a seat that renders an empty map is told
  // delegation is off, so refuse rather than answer with nothing.
  if (standing.length === 0) fail(`no \`${PAGE_TYPE}\` page stands, so there is no kind to render`)
  let definitions: Readonly<Record<string, Definition>>
  try {
    definitions = kindsIn(
      root,
      [...standing].sort((one, two) => (one.path < two.path ? -1 : 1))
    )
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
  const json = `${JSON.stringify(definitions, null, 2)}\n`
  if (out === null) process.stdout.write(json)
  else writeFileSync(out, json)
}

if (import.meta.main) main()
