import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { fail } from "@akasha/command-system/command-failing"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const NOTICES = "seat-system/notices/pages"

const TAIL = ".notice.text.md"

const HELP = `compose-notices — render what a seat is told when it is put back to work

Every notice page under \`${NOTICES}\`, as a JSON object of notice slug to composed text.
Callers ask for them by slug, so a page renamed there is a notice one of them no longer
finds. Nothing says so before a fleet meets it: the check that did,
\`tools/audits/resume-notices.ts\`, went with the rest of that orphaned folder and has no
successor yet.

Wrapping is the author's convenience and not part of the text: the lines of a paragraph
are joined with a space, and a blank line between paragraphs survives as one.

Usage:
  bun akasha/seat-system/compose-notices/compose-notices.module.code.ts [--out <path>]

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

export function noticesUnder(folder: string): Readonly<Record<string, string>> {
  const notices: Record<string, string> = {}
  for (const name of readdirSync(folder).sort()) {
    if (!name.endsWith(TAIL)) continue
    notices[name.slice(0, -TAIL.length)] = render(readFileSync(`${folder}/${name}`, "utf8"))
  }
  return notices
}

export function notices(): Readonly<Record<string, string>> {
  const folder = `${rootFor(resolveRoots(), AKASHA)}/${NOTICES}`
  if (!existsSync(folder)) {
    fail(`${folder} is not there, so there is no notice to render`)
  }
  const found = noticesUnder(folder)
  if (Object.keys(found).length === 0) {
    fail(`${folder} holds no notice page, so there is no notice to render`)
  }
  return found
}

function main(): void {
  const { out } = parse(process.argv.slice(2))
  const json = `${JSON.stringify(notices(), null, 2)}\n`
  if (out === null) process.stdout.write(json)
  else writeFileSync(out, json)
}

if (import.meta.main) main()
