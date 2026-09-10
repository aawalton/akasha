import { textOf } from "@akasha/code/body-text"
import type { Naming } from "@akasha/code/code-specifier"
import { edgesIn } from "@akasha/indexes/import"
import { manifestsAmong, reachingOf } from "@akasha/indexes/package-reaching"
import type { Change } from "@akasha/pages/change"
import type { Replacing } from "../../../changes/modules/answer/change-answer.module.types.ts"
import { said as gitIn } from "../../../git/running/git-running.module.code.ts"

const MANIFEST = "package.json"

const STYLES_ENDING = ".stylesheet.styles.css"

const TS_ENDING = ".ts"

const TSX_ENDING = ".tsx"

const VITE_ENDING = "/vite.config.ts"

const TAIL = "/**/*.{ts,tsx}"

const DEPTH = 2

const ENTRY_IMPORT =
  /@import\s+(?:url\s*\(\s*)?["']?tailwindcss["']?\s*\)?\s*(?:layer\s*\([^)]*\)\s*)?;/

const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g

const GLOB_LINE = /^@source\s+(?!inline\b)/

const IMPORT_LINE = /^@(?:charset|import)\b/

export type Globbed = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING_GLOBBED: Globbed = { edits: [], said: [] }

function everyIn(change: Change): readonly string[] {
  const held = new Set(gitIn(change.root, ["ls-files", "-z"]).split("\0"))
  held.delete("")
  for (const path of change.changed) {
    if (change.after(path) === null) held.delete(path)
    else held.add(path)
  }
  return [...held].sort()
}

export function folderOf(path: string): string {
  const at = path.lastIndexOf("/")
  return at === -1 ? "" : path.slice(0, at)
}

function typedName(path: string): boolean {
  return path.endsWith(TS_ENDING) || path.endsWith(TSX_ENDING)
}

export function appFor(at: string, roots: ReadonlySet<string>): string | null {
  for (let folder = folderOf(at); ; folder = folderOf(folder)) {
    if (roots.has(folder)) return folder
    if (folder === "") return null
  }
}

export function rolledTo(path: string): string {
  const folder = folderOf(path)
  const parts = folder.split("/")
  return parts.length <= DEPTH ? folder : parts.slice(0, DEPTH).join("/")
}

export function reachedFrom(
  seeds: readonly string[],
  bodyAt: (path: string) => string | null,
  naming: Naming,
  known: ReadonlySet<string>
): ReadonlySet<string> {
  const found = new Set<string>(seeds)
  const waiting = [...seeds]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    const body = bodyAt(one)
    if (body === null) continue
    for (const there of edgesIn(body, one, naming)) {
      if (found.has(there) || !known.has(there)) continue
      found.add(there)
      if (typedName(there)) waiting.push(there)
    }
  }
  return found
}

export function spelledFrom(from: string, to: string): string {
  const one = from === "" ? [] : from.split("/")
  const two = to === "" ? [] : to.split("/")
  let same = 0
  while (same < one.length && same < two.length && one[same] === two[same]) same += 1
  const parts = [...new Array<string>(one.length - same).fill(".."), ...two.slice(same)]
  return parts.length === 0 ? "." : parts.join("/")
}

export function blockFor(at: string, app: string, reached: ReadonlySet<string>): string {
  const folders = new Set<string>()
  for (const one of reached) {
    if (!one.endsWith(TSX_ENDING)) continue
    if (one.startsWith(`${app}/`)) continue
    const folder = rolledTo(one)
    if (folder !== "") folders.add(folder)
  }
  const held = [...folders]
  const kept = held.filter((one) => !held.some((two) => one.startsWith(`${two}/`)))
  const from = folderOf(at)
  return kept
    .sort()
    .map((one) => `@source "${spelledFrom(from, one)}${TAIL}";`)
    .join("\n")
}

export function bodyWith(css: string, block: string): string {
  const lines = css.split("\n")
  const globs: number[] = []
  let lastImport = -1
  for (let at = 0; at < lines.length; at += 1) {
    const line = (lines[at] ?? "").trim()
    if (GLOB_LINE.test(line)) globs.push(at)
    else if (IMPORT_LINE.test(line)) lastImport = at
  }
  const first = globs[0]
  const put = first === undefined ? lastImport + 1 : first
  const taken = new Set(globs)
  const kept: string[] = []
  for (let at = 0; at < lines.length; at += 1) {
    if (at === put && block !== "") kept.push(...block.split("\n"))
    if (taken.has(at)) continue
    kept.push(lines[at] ?? "")
  }
  if (put >= lines.length && block !== "") kept.push(...block.split("\n"))
  return kept.join("\n")
}

export function isEntry(css: string): boolean {
  return ENTRY_IMPORT.test(css.replace(BLOCK_COMMENT, ""))
}

export function globbedOver(change: Change): Globbed {
  const every = everyIn(change)
  const known = new Set(every)
  const read = new Map<string, string | null>()
  const bodyAt = (path: string): string | null => {
    const held = read.get(path)
    if (held !== undefined) return held
    const body = textOf(change.after(path))
    read.set(path, body)
    return body
  }
  const roots = new Set(
    every.filter((one) => one.endsWith(VITE_ENDING)).map((one) => folderOf(one))
  )
  const naming = reachingOf(manifestsAmong(every, MANIFEST), bodyAt)
  const edits: Replacing[] = []
  const said: string[] = []
  for (const at of every.filter((one) => one.endsWith(STYLES_ENDING))) {
    const css = textOf(change.after(at))
    if (css === null || !isEntry(css)) continue
    const app = appFor(at, roots)
    if (app === null) continue
    const seeds = every.filter((one) => typedName(one) && one.startsWith(`${app}/`))
    const block = blockFor(at, app, reachedFrom(seeds, bodyAt, naming, known))
    const body = bodyWith(css, block)
    if (body === css) continue
    const many = block === "" ? 0 : block.split("\n").length
    edits.push({ kind: "replace", path: at, contentFrom: css, contentTo: body })
    said.push(`\`${at}\` was written again with the ${many} source glob(s) its imports reach`)
  }
  return { edits, said }
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    if (path === MANIFEST || path.endsWith(`/${MANIFEST}`)) return true
    if (path.endsWith(STYLES_ENDING)) return true
    if (typedName(path)) return true
  }
  return false
}

export function globbedFor(change: Change): Globbed {
  try {
    if (!couldTurn(change)) return NOTHING_GLOBBED
    return globbedOver(change)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no source glob was written again — ${why}`] }
  }
}
