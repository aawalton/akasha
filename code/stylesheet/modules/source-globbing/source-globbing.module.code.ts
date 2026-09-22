import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import {
  globbedIn,
  placedIn,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  type Asked,
  closureOf,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import {
  everyOfType,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
  uncommittedBesideAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import picomatch from "picomatch"

const MANIFEST = "package.json"

const STYLESHEET = "stylesheet"

const STYLES = "styles"

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
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
}

const REACHED = "reached"

const HELD_JSONL = "jsonl"

const HELD_TS = "ts"

const HELD_CSS = "css"

const GLOBBING = "import.meta.glob"

function anything(): boolean {
  return true
}

function nothingThere(): null {
  return null
}

function namedBy(key: string, coded: readonly string[]): readonly string[] {
  const matches = picomatch(key)
  return coded.filter((one) => matches(one))
}

function globbedFrom(
  found: readonly string[],
  coded: readonly string[],
  bodyAt: (path: string) => string | null,
  named: Map<string, readonly string[]>
): readonly string[] {
  const held: string[] = []
  for (const at of found) {
    const body = typeScripted(at) ? bodyAt(at) : null
    if (body === null || !body.includes(GLOBBING)) continue
    for (const pattern of globbedIn(at, body)) {
      const key = join(folderOf(at), pattern)
      const there = named.get(key) ?? namedBy(key, coded)
      named.set(key, there)
      held.push(...there)
    }
  }
  return held
}

export function reachOf(
  seeds: readonly string[],
  coded: readonly string[],
  asked: Asked,
  named: Map<string, readonly string[]> = new Map()
): ReadonlySet<string> {
  const bodyAt = asked.bodyAt ?? nothingThere
  const through = asked.through ?? anything
  const found = new Set<string>()
  const asking = { ...asked, through: (one: string) => through(one) && !found.has(one) }
  let taking = seeds
  while (taking.length > 0) {
    const fresh = closureOf(imports, taking, asking)
    for (const one of fresh) found.add(one)
    taking = [...new Set(globbedFrom(fresh, coded, bodyAt, named))].filter((one) => !found.has(one))
  }
  return found
}

function reachedAt(at: string): string | null {
  const said = partedIn(at)
  if (said === null) return null
  const page = join(folderOf(at), `${pageOf(said)}.${HELD_TS}`)
  return uncommittedBesideAt(page, REACHED, HELD_JSONL)
}

function rowsFor(root: string, at: string, reached: ReadonlySet<string>): FileChange | null {
  const rows = reachedAt(at)
  if (rows === null) return null
  const body = [...reached]
    .sort()
    .map((one) => `${one}\n`)
    .join("")
  const was = textThere(join(root, rows))
  if (was === body) return null
  if (was === null) return { kind: "add", path: rows, content: body }
  return { kind: "replace", path: rows, contentFrom: was, contentTo: body }
}

const NOTHING_GLOBBED: Globbed = { edits: [], said: [] }

const NOTHING_REACHED: ReadonlySet<string> = new Set()

function everyIn(change: Change): readonly string[] {
  const held = new Set(gitIn(change.root, ["ls-files", "-z"]).split("\0"))
  held.delete("")
  for (const path of change.changed) {
    if (change.after(path) === null) held.delete(path)
    else held.add(path)
  }
  return [...held]
}

function styledName(path: string): boolean {
  if (!path.includes(STYLESHEET)) return false
  const said = partedIn(path)
  if (said === null || said.pageType !== STYLESHEET) return false
  return said.sections.length === 1 && said.sections[0] === STYLES
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

function globbedOver(change: Change): Globbed {
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
  const index = shadowAt(change.root).index
  const coded = every.filter((one) => typeScripted(one))
  const named = new Map<string, readonly string[]>()
  const edits: FileChange[] = []
  const said: string[] = []
  for (const at of every.filter((one) => styledName(one)).sort()) {
    const css = textOf(change.after(at))
    const app = css === null || !isEntry(css) ? null : appFor(at, roots)
    const seeds = app === null ? [] : coded.filter((one) => one.startsWith(`${app}/`))
    const asked = { index, bodyAt, through: (one: string) => known.has(one) }
    const reached = app === null ? NOTHING_REACHED : reachOf(seeds, coded, asked, named)
    const rows = rowsFor(change.root, at, reached)
    if (rows !== null) edits.push(rows)
    if (app === null || css === null) continue
    const block = blockFor(at, app, reached)
    const body = bodyWith(css, block)
    if (body === css) continue
    const many = block === "" ? 0 : block.split("\n").length
    edits.push({ kind: "replace", path: at, contentFrom: css, contentTo: body })
    said.push(`\`${at}\` was written again with the ${many} source glob(s) its imports reach`)
  }
  return { edits, said }
}

function specifiersIn(body: string | null, path: string): string {
  if (body === null) return ""
  return placedIn(path, body)
    .map((one) => one.text)
    .sort()
    .join("\n")
}

function styledIn(change: Change): readonly string[] {
  const found: string[] = []
  for (const one of everyOfType(readingIn(change.root), STYLESHEET)) {
    const styles = besideAt(one.path, STYLES, HELD_CSS)
    if (styles === null || change.after(styles) === null) continue
    found.push(one.path)
  }
  return found
}

function moved(change: Change, path: string): boolean {
  const before = textOf(change.before(path))
  const after = textOf(change.after(path))
  if ((before === null) !== (after === null)) return true
  return specifiersIn(before, path) !== specifiersIn(after, path)
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    if (path === MANIFEST || path.endsWith(`/${MANIFEST}`)) return true
    if (styledName(path)) return true
  }
  const changed = new Set(change.changed.filter((one) => typeScripted(one)))
  if (changed.size === 0) return false
  for (const one of changed) {
    if (change.before(one) === null || change.after(one) === null) return true
  }
  for (const page of styledIn(change)) {
    const rows = uncommittedBesideAt(page, REACHED, HELD_JSONL)
    const body = rows === null ? null : textThere(join(change.root, rows))
    if (body === null) return true
    for (const line of body.split("\n")) {
      if (line !== "" && changed.has(line) && moved(change, line)) return true
    }
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
