import { textOf } from "@akasha/code/body-text"
import { said as gitIn } from "@akasha/git/git-running"
import type { Change } from "@akasha/pages/change"
import type { Replacing } from "../../../changes/modules/answer/change-answer.module.types.ts"

const MANIFEST = "package.json"

const STYLES_ENDING = ".stylesheet.styles.css"

const TSX_ENDING = ".tsx"

const TAIL = "/**/*.{ts,tsx}"

const DEPENDS_KINDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]

const ENTRY_IMPORT =
  /@import\s+(?:url\s*\(\s*)?["']?tailwindcss["']?\s*\)?\s*(?:layer\s*\([^)]*\)\s*)?;/

const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g

const GLOB_LINE = /^@source\s+(?!inline\b)/

const IMPORT_LINE = /^@(?:charset|import)\b/

export type Reached = {
  readonly name: string
  readonly at: string
  readonly depends: readonly string[]
}

export type Globbed = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING_GLOBBED: Globbed = { edits: [], said: [] }

function listedIn(change: Change, ending: string, spec: string): readonly string[] {
  const held = new Set<string>()
  for (const path of gitIn(change.root, ["ls-files", "-z", "--", spec]).split("\0")) {
    if (path.endsWith(ending)) held.add(path)
  }
  for (const path of change.changed) {
    if (!path.endsWith(ending)) continue
    if (change.after(path) === null) held.delete(path)
    else held.add(path)
  }
  return [...held].sort()
}

function dependsIn(manifest: Record<string, unknown>): readonly string[] {
  const named: string[] = []
  for (const kind of DEPENDS_KINDS) {
    const found = manifest[kind]
    if (typeof found !== "object" || found === null) continue
    for (const one of Object.keys(found)) named.push(one)
  }
  return named
}

export function reachedIn(change: Change): readonly Reached[] {
  const read: Reached[] = []
  for (const path of listedIn(change, MANIFEST, `*/${MANIFEST}`)) {
    const body = textOf(change.after(path))
    if (body === null) continue
    let held: unknown
    try {
      held = JSON.parse(body)
    } catch {
      continue
    }
    if (typeof held !== "object" || held === null) continue
    const manifest = Object.fromEntries(Object.entries(held))
    const name = manifest.name
    if (typeof name !== "string") continue
    read.push({ name, at: path.slice(0, -(MANIFEST.length + 1)), depends: dependsIn(manifest) })
  }
  const named = new Set(read.map((one) => one.name))
  return read.map((one) => ({
    name: one.name,
    at: one.at,
    depends: [...new Set(one.depends.filter((two) => named.has(two)))],
  }))
}

export function ownerOf(path: string, packages: readonly Reached[]): Reached | null {
  let held: Reached | null = null
  for (const one of packages) {
    if (path !== one.at && !path.startsWith(`${one.at}/`)) continue
    if (held === null || one.at.length > held.at.length) held = one
  }
  return held
}

export function reachedFrom(packages: readonly Reached[], from: string): readonly string[] {
  const byName = new Map(packages.map((one) => [one.name, one]))
  const found = new Set<string>()
  const waiting = [...(byName.get(from)?.depends ?? [])]
  for (let one = waiting.shift(); one !== undefined; one = waiting.shift()) {
    if (one === from || found.has(one)) continue
    const held = byName.get(one)
    if (held === undefined) continue
    found.add(one)
    waiting.push(...held.depends)
  }
  return [...found]
}

export function spelledFrom(from: string, to: string): string {
  const one = from === "" ? [] : from.split("/")
  const two = to === "" ? [] : to.split("/")
  let same = 0
  while (same < one.length && same < two.length && one[same] === two[same]) same += 1
  const parts = [...new Array<string>(one.length - same).fill(".."), ...two.slice(same)]
  return parts.length === 0 ? "." : parts.join("/")
}

export function blockFor(
  at: string,
  packages: readonly Reached[],
  drawing: ReadonlySet<string>
): string {
  const owner = ownerOf(at, packages)
  if (owner === null) return ""
  const byName = new Map(packages.map((one) => [one.name, one]))
  const folders: string[] = []
  for (const name of reachedFrom(packages, owner.name)) {
    if (!drawing.has(name)) continue
    const held = byName.get(name)
    if (held === undefined) continue
    folders.push(held.at)
  }
  const kept = folders.filter((one) => !folders.some((two) => one.startsWith(`${two}/`)))
  const from = at.slice(0, at.lastIndexOf("/"))
  return [...new Set(kept)]
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
  const packages = reachedIn(change)
  const drawing = new Set<string>()
  for (const path of listedIn(change, TSX_ENDING, `*${TSX_ENDING}`)) {
    const owner = ownerOf(path, packages)
    if (owner !== null) drawing.add(owner.name)
  }
  const edits: Replacing[] = []
  const said: string[] = []
  for (const at of listedIn(change, STYLES_ENDING, `*${STYLES_ENDING}`)) {
    const css = textOf(change.after(at))
    if (css === null || !isEntry(css)) continue
    const block = blockFor(at, packages, drawing)
    const body = bodyWith(css, block)
    if (body === css) continue
    const many = block === "" ? 0 : block.split("\n").length
    edits.push({ kind: "replace", path: at, contentFrom: css, contentTo: body })
    said.push(`\`${at}\` was written again with the ${many} source glob(s) its packages warrant`)
  }
  return { edits, said }
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    if (path === MANIFEST || path.endsWith(`/${MANIFEST}`)) return true
    if (path.endsWith(STYLES_ENDING)) return true
    if (!path.endsWith(TSX_ENDING)) continue
    if (change.before(path) === null || change.after(path) === null) return true
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
