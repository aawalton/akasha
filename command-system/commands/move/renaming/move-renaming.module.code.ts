import { basename } from "node:path"
import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import { spelledIn } from "@akasha/code-system/code-specifier"
import { namersOf, readingIn } from "@akasha/indexes"
import { knownIn, namesIn, namingsIn, reaches, type Shaped } from "@akasha/indexes/reaching"
import { addressIn } from "@akasha/pages-system/page-address"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import { valuesOver } from "@akasha/pages-system/page-value"
import ts from "typescript"
import { counted } from "../../../asking/asking.module.code.ts"
import type { Spot } from "../../refactor/type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../../refactor/type-renaming/type-renaming.module.code.ts"
import { namesStill } from "../../refactor/type-respelling/type-respelling.module.code.ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

const LEFT = 12

export type Renaming = {
  readonly id: string
  readonly was: string
  readonly now: string
  readonly pageTypeSlug: string
}

export type Asked = { readonly renaming: Renaming } | { readonly refused: string }

export function renamingFor(from: string, to: string, id: string): Asked {
  const was = partedIn(from)
  const now = partedIn(to)
  const alike =
    was !== null &&
    now !== null &&
    was.sections.length === 0 &&
    now.sections.length === 0 &&
    was.held === now.held &&
    was.pageType === now.pageType
  if (was === null || now === null || !alike) {
    return {
      refused:
        `${from} would arrive called \`${basename(to)}\` — a move carries a body under the name ` +
        "it already has, and the one name it changes is the slug a page states",
    }
  }
  if (was.pageType === PAGE_TYPE) {
    return {
      refused:
        `${from} states a page type's slug, and that slug is the tail of every file naming a page ` +
        "of that type and the scope every one of their slugs is unique within, so a page type's " +
        "slug is not renamed here",
    }
  }
  return { renaming: { id, was: was.slug, now: now.slug, pageTypeSlug: was.pageType } }
}

export function besideRenamed(name: string, one: Renaming): string {
  const said = `${one.was}.${one.pageTypeSlug}.`
  return name.startsWith(said) ? `${one.now}.${one.pageTypeSlug}.${name.slice(said.length)}` : name
}

function slugSpotIn(source: ts.SourceFile, held: ts.ObjectLiteralExpression): Spot | null {
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
    if (key !== SLUG || !ts.isStringLiteral(one.initializer)) continue
    return { start: one.initializer.getStart(source), end: one.initializer.getEnd() }
  }
  return null
}

export type Stated = { readonly name: Spot; readonly slug: Spot }

export function statedIn(path: string, text: string): Stated | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined || !ts.isIdentifier(one.name)) continue
      const held = literalOf(one.initializer)
      const slug = held === null ? null : slugSpotIn(source, held)
      if (slug === null) continue
      return { name: { start: one.name.getStart(source), end: one.name.getEnd() }, slug }
    }
  }
  return null
}

export function restated(path: string, text: string, now: string): string | null {
  const said = statedIn(path, text)
  if (said === null) return null
  return splicedIn(text, [
    [said.name, exportedAs(now)],
    [said.slug, JSON.stringify(now)],
  ])
}

export function rebound(path: string, text: string, was: string, now: string): string {
  const from = exportedAs(was)
  const to = exportedAs(now)
  if (from === to) return text
  const source = parsedAs(path, text)
  const said: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && node.text === from) {
      said.push([{ start: node.getStart(source), end: node.getEnd() }, to])
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return splicedIn(text, said)
}

export function addressingIn(value: Value, known: Shaped, id: string): readonly string[] {
  const found = new Set<string>()
  for (const one of namingsIn(value, known)) {
    if (one.own) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if (!("refused" in reached) && reached.id === id) found.add(named)
    }
  }
  return [...found]
}

export function readdressed(named: string, now: string): string | null {
  const address = addressIn(named)
  if (address.kind === "id") return null
  return address.kind === "qualified" ? `${address.pageTypeSlug}/${now}` : now
}

export function respelled(path: string, text: string, said: ReadonlyMap<string, string>): string {
  if (said.size === 0) return text
  let out = ""
  let at = 0
  for (const one of spelledIn(path, text)) {
    const next = said.get(one.text)
    if (next === undefined) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  return `${out}${text.slice(at)}`
}

export type Addressing = ReadonlyMap<string, ReadonlyMap<string, string>>

export const NOTHING_ADDRESSED: Addressing = new Map()

export function addressingOver(
  root: string,
  renamings: readonly Renaming[],
  textOf: (path: string) => string | null
): Addressing {
  if (renamings.length === 0) return NOTHING_ADDRESSED
  const loadedAt = valuesOver(textOf)
  const known = knownIn(readingIn(root), loadedAt)
  const found = new Map<string, Map<string, string>>()
  for (const one of renamings) {
    for (const path of new Set(namersOf(root, one.id).map((named) => named.path))) {
      const value = loadedAt(path)
      if (value === null) continue
      const held = found.get(path) ?? new Map<string, string>()
      for (const said of addressingIn(value, known, one.id)) {
        const next = readdressed(said, one.now)
        if (next !== null && next !== said) held.set(said, next)
      }
      if (held.size > 0) found.set(path, held)
    }
  }
  return found
}

export type Spelling = {
  readonly path: string
  readonly line: number | null
}

export type Unrepointed = {
  readonly renaming: Renaming
  readonly spellings: readonly Spelling[]
}

type Written = { readonly path: string; readonly body: Uint8Array | null }

export function spellingsStill(
  paths: readonly string[],
  was: string,
  textOf: (path: string) => string | null
): readonly Spelling[] {
  const found: Spelling[] = []
  for (const path of paths) {
    if (namesStill(path, was).length > 0) found.push({ path, line: null })
    const text = textOf(path)
    if (text === null) continue
    for (const line of namesStill(text, was)) found.push({ path, line })
  }
  return found
}

export function unrepointedIn(
  renamings: readonly Renaming[],
  moved: ReadonlyMap<string, string>,
  paths: () => readonly string[],
  changes: readonly Written[],
  textOf: (path: string) => string | null
): readonly Unrepointed[] {
  if (renamings.length === 0) return []
  const wrote = new Map<string, string>()
  for (const one of changes) {
    if (one.body !== null) wrote.set(one.path, new TextDecoder().decode(one.body))
  }
  const scanned = [...new Set([...paths(), ...moved.values()])]
    .filter((one) => !moved.has(one))
    .sort()
  const at = (path: string): string | null => wrote.get(path) ?? textOf(path)
  return renamings.map((one) => ({
    renaming: one,
    spellings: spellingsStill(scanned, one.was, at),
  }))
}

export function unrepointedSaid(held: readonly Unrepointed[], dry: boolean): readonly string[] {
  const report: string[] = []
  for (const one of held) {
    const found = one.spellings
    const was = one.renaming.was
    if (found.length === 0) {
      report.push(`nothing else spells the old slug \`${was}\``)
      continue
    }
    report.push(
      `${counted(found.length, "place")} still ${found.length === 1 ? "spells" : "spell"} the old ` +
        `slug \`${was}\` and ${dry ? "would go" : "went"} unrepointed — read each and judge it`
    )
    for (const at of found.slice(0, LEFT)) {
      report.push(at.line === null ? `  ${at.path} — the path itself` : `  ${at.path}:${at.line}`)
    }
    if (found.length > LEFT) report.push(`  and ${found.length - LEFT} more`)
  }
  return report
}
