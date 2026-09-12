import { writeFileSync } from "node:fs"
import { fail } from "akasha/commands/modules/failing/command-failing.module.code.ts"
import { bodyAt } from "akasha/pages/file-body/page-file-body.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  AKASHA,
  ownRepoRoot,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const PAGE_TYPE = "notice"

const TEXT = "text"

const MODULE = "module"

const OWN = "compose-notices"

const CODE = "code"

const TS = "ts"

function ownPath(): string {
  const page = listedAt(ownRepoRoot(), MODULE, OWN)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) throw new Error(`no \`${MODULE}\` is slugged \`${OWN}\``)
  return at
}

function help(): string {
  return `compose-notices — render what a seat is told when it is put back to work

Every notice page the index files, as a JSON object of notice slug to composed text.
Callers ask for them by slug, so a page renamed is a notice one of them no longer finds.

Wrapping is the author's convenience and not part of the text: the lines of a paragraph
are joined with a space, and a blank line between paragraphs survives as one.

Usage:
  bun ${ownPath()} [--output <path>]

Flags:
  --output <path>   Write there rather than to stdout.
  --help            This.
`
}

function parse(argv: readonly string[]): { readonly output: string | null } {
  let output: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--help") {
      process.stdout.write(help())
      process.exit(0)
    }
    if (arg === "--output") {
      const value = argv[i + 1]
      if (value === undefined) fail("`--output` takes a value")
      i += 1
      output = value
    } else fail(`\`${arg}\` is not an argument this takes — run it with --help`)
  }
  return { output }
}

export function render(body: string): string {
  return body
    .split(/\n[ \t]*\n/)
    .map((paragraph) =>
      paragraph
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join(" ")
    )
    .filter((paragraph) => paragraph !== "")
    .join("\n\n")
}

function noticesIn(root: string): Readonly<Record<string, string>> {
  const rendered: Record<string, string> = {}
  for (const one of valuesOfType(root, PAGE_TYPE)) {
    const named = partedIn(one.path)
    const held = one.value[TEXT]
    if (named === null || typeof held !== "string") continue
    const read = bodyAt(root, one.path, TEXT, held)
    if ("refused" in read) throw new Error(read.refused)
    rendered[named.slug] = render(read.body)
  }
  return rendered
}

export function notices(): Readonly<Record<string, string>> {
  const root = rootFor(resolveRoots(), AKASHA)
  const found = noticesIn(root)
  if (Object.keys(found).length === 0) {
    throw new Error(`${root} files no notice page, so there is no notice to render`)
  }
  return found
}

function main(): undefined {
  const { output } = parse(process.argv.slice(2))
  let composed: Readonly<Record<string, string>>
  try {
    composed = notices()
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
  const json = `${JSON.stringify(composed, null, 2)}\n`
  if (output === null) process.stdout.write(json)
  else writeFileSync(output, json)
}

if (import.meta.main) main()
