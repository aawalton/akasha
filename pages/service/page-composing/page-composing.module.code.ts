import { existsSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { ENTRY_PROPERTY, filePropertiesAt } from "@akasha/indexes/entries"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { STEM_CEILING } from "@akasha/pages/naming/named-for/page-stem"
import { bodyOf, importedFrom, unnamedIn } from "@akasha/pages/page-body"
import { partsOver } from "@akasha/pages/page-entry-writing"
import { besideAt } from "@akasha/pages/page-file-name"
import { partsOf } from "@akasha/pages/page-file-parts"
import { type Carried, propertiesFrom, sourceIn } from "@akasha/pages/page-type-properties"
import { textAt, type Value, valueAt } from "@akasha/pages/page-value"

const PAGE_TYPE = "page-type"

const PLURAL = "pluralSlug"

const ID = "id"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const TYPE = "type"

const SLUG = "slug"

const JSONL = "jsonl"

export function bodyRefused(
  key: string,
  pageTypeSlug: string,
  fileName: string | null | undefined,
  ending: unknown
): string | null {
  const hands = `\`${key}\` hands over a body`
  if (pageTypeSlug === ENTRY_PROPERTY) {
    return `${hands}, and \`${key}\` keeps its values as rows, so those are handed over as a list`
  }
  if (fileName === undefined) {
    return `${hands}, and \`${key}\` is no property this page type holds in a file beside the page`
  }
  if (fileName !== null) {
    return `${hands}, and \`${key}\` is held at \`${fileName}\`, a name of its own rather than one beside the page`
  }
  if (typeof ending !== "string" || ending === "") {
    return `${hands}, and nothing names that file's ending, so the file has no name`
  }
  return null
}

export type Naming = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: Value
  readonly merge?: boolean
  readonly bodies?: Readonly<Record<string, string>>
}

export type Put = {
  readonly path: string
  readonly content: string
}

export type Kept = {
  readonly path: string
  readonly values: Value
}

export type Composed =
  | {
      readonly put: Put
      readonly kept: Kept | null
      readonly parts: readonly Put[]
      readonly removes: readonly string[]
    }
  | { readonly refused: string }

export function orderedIn(carried: readonly Carried[]): readonly Carried[] {
  const held = new Map<string, Carried[]>()
  for (const one of carried) {
    const group = held.get(one.declaredBy) ?? []
    group.push(one)
    held.set(one.declaredBy, group)
  }
  return [...held.values()].reverse().flat()
}

const PAGES = "pages"

const PARTED_BY = "/"

const NAME_HOLDS = 255

const NAME_TAKES = 0x20

const SHOWN = 40

const RUN_OF_SPACE = /\s+/g

const BYTES = new TextEncoder()

export function besideItsPage(root: string, carried: readonly Carried[]): boolean {
  const filed = filePropertiesAt(root)
  return carried.some((one) => filed.get(one.declaredBy)?.has(one.propertySlug) === true)
}

export function folderFor(plural: string, pageTypeSlug: string, slug: string): string {
  for (const above of [plural, pageTypeSlug]) {
    if (above === "") continue
    const opening = `${above}-`
    if (slug.startsWith(opening) && slug.length > opening.length) {
      return slug.slice(opening.length)
    }
  }
  return slug
}

export function namedForThePlural(named: string, plural: string): boolean {
  if (named === "") return false
  return named === plural || plural.endsWith(`-${named}`)
}

export function pathFor(
  typeAt: string,
  plural: string,
  pageTypeSlug: string,
  slug: string,
  besideIt: boolean
): string {
  const above = typeAt.split("/").slice(0, -1)
  const folder = above.join("/")
  const under = namedForThePlural(above.at(-1) ?? "", plural) ? PAGES : plural
  const own = besideIt ? `/${folderFor(plural, pageTypeSlug, slug)}` : ""
  return `${folder}/${under}${own}/${slug}.${pageTypeSlug}.ts`
}

function saying(keys: readonly string[]): string {
  return keys.map((one) => `\`${one}\``).join(", ")
}

function shownAs(held: string): string {
  if (held.length <= SHOWN) return `\`${held}\``
  return `${held.length} characters opening \`${held.slice(0, SHOWN).replace(RUN_OF_SPACE, " ")}\``
}

export function slugRefused(slug: string): string | null {
  if (slug.length <= STEM_CEILING) return null
  return (
    `this names a page whose slug is ${shownAs(slug)}, past the ${STEM_CEILING} characters a ` +
    `page's slug holds. A name minted from text is shortened where it is minted, because only ` +
    `what minted it knows which words may go.`
  )
}

function offAName(held: string): boolean {
  for (let at = 0; at < held.length; at += 1) {
    if ((held.codePointAt(at) ?? NAME_TAKES) < NAME_TAKES) return true
  }
  return false
}

export function endingWhy(held: string, name: string): string | null {
  if (held === "") return "names nothing"
  if (held.includes(PARTED_BY)) return "names a folder rather than an ending"
  if (offAName(held)) return "holds a character no file name takes"
  const made = BYTES.encode(name).length
  if (made > NAME_HOLDS) {
    return `makes a name of ${made} bytes, past the ${NAME_HOLDS} a file name holds`
  }
  return null
}

export function endingRefused(
  key: string,
  propertySlug: string,
  at: string,
  held: unknown
): string | null {
  const names = `\`${key}\` is held in a file beside the page, so what a page states under it names that file's ending`
  const instead = `Write that file at a path of its own and leave \`${key}\` naming the ending.`
  if (typeof held !== "string") {
    return `${names}, and this write hands over a ${typeof held} rather than an ending. ${instead}`
  }
  const beside = besideAt(at, propertySlug, held)
  if (beside === null) return null
  const why = endingWhy(held, beside.slice(beside.lastIndexOf(PARTED_BY) + 1))
  if (why === null) return null
  return `${names}, and this write hands over ${shownAs(held)}, which ${why}. ${instead}`
}

export function composedFor(root: string, named: Naming): Composed {
  const tooLong = slugRefused(named.slug)
  if (tooLong !== null) return { refused: tooLong }
  const typed = listedAt(root, PAGE_TYPE, named.pageTypeSlug)
  const typeAt = typed.length === 1 ? typed[0]?.path : undefined
  if (typeAt === undefined) {
    return { refused: `\`${named.pageTypeSlug}\` names no page type the index holds` }
  }
  const source = sourceIn(root, (path) => valueAt(path, root))
  const carried = orderedIn(propertiesFrom(named.pageTypeSlug, source))
  if (carried.length === 0) {
    return { refused: `\`${named.pageTypeSlug}\` declares no property, so nothing may be written` }
  }
  const unnamed = unnamedIn(
    carried.map((one) => one.key),
    named.values
  )
  if (unnamed.length > 0) {
    return {
      refused: `\`${named.pageTypeSlug}\` declares no property carried as ${saying(unnamed)}`,
    }
  }
  const secret = carried.filter((one) => one.secret && one.key in named.values)
  if (secret.length > 0) {
    return {
      refused: `${saying(secret.map((one) => one.key))} is a secret, and this writes no secret`,
    }
  }
  const listed = listedAt(root, named.pageTypeSlug, named.slug)
  const held = listed.length === 1 ? listed[0]?.path : undefined
  const plural = textAt(valueAt(typeAt, root) ?? {}, PLURAL)
  if (held === undefined && plural === null) {
    return { refused: `\`${named.pageTypeSlug}\` states no ${PLURAL}, so a new page has no place` }
  }
  const beside = held === undefined && besideItsPage(root, carried)
  const at = held ?? pathFor(typeAt, plural ?? "", named.pageTypeSlug, named.slug, beside)
  const was = held === undefined ? null : valueAt(held, root)
  const already: Value = named.merge === true && was !== null ? was : {}
  const outside: Value = {}
  const inside: Value = {}
  const parts: Put[] = []
  const removes: string[] = []
  const filedBy = filePropertiesAt(root).get(named.pageTypeSlug)
  const bodies = named.bodies ?? {}
  for (const one of carried) {
    const stated = one.key in named.values
    const bodied = one.key in bodies
    if (!stated && !bodied && !(one.key in already)) continue
    const value = stated ? named.values[one.key] : already[one.key]
    if (one.uncommitted) {
      outside[one.key] = value
      continue
    }
    if (bodied) {
      const heldAs = filedBy === undefined ? undefined : filedBy.get(one.propertySlug)
      const refused = bodyRefused(one.key, one.pageTypeSlug, heldAs, value)
      if (refused !== null) return { refused }
      const ending = value as string
      const why = endingRefused(one.key, one.propertySlug, at, ending)
      if (why !== null) return { refused: why }
      const besideFile = besideAt(at, one.propertySlug, ending)
      if (besideFile === null) {
        return { refused: `\`${at}\` is no page file, so no file sits beside it` }
      }
      parts.push({ path: besideFile, content: bodies[one.key] ?? "" })
      inside[one.key] = ending
      continue
    }
    if (one.pageTypeSlug === ENTRY_PROPERTY && Array.isArray(value)) {
      const said = already[one.key]
      const ending = typeof said === "string" && said !== "" ? said : JSONL
      const made = partsOver(at, one.propertySlug, ending, value, ENTRY_CEILING)
      if ("refused" in made) return { refused: made.refused }
      for (const part of made.parts) parts.push({ path: part.path, content: part.text })
      const filled = partsOf(at, one.propertySlug, ending, (path) => existsSync(join(root, path)))
      for (const gone of filled.slice(made.parts.length)) removes.push(gone)
      inside[one.key] = ending
      continue
    }
    if (filedBy !== undefined && filedBy.get(one.propertySlug) === null) {
      const refused = endingRefused(one.key, one.propertySlug, at, value)
      if (refused !== null) return { refused }
    }
    inside[one.key] = value
  }
  const wasId = was === null ? undefined : was[ID]
  if (inside[ID] === undefined && wasId !== undefined) inside[ID] = wasId
  inside[PAGE_TYPE_SLUG] = named.pageTypeSlug
  inside[TYPE] = named.pageTypeSlug
  inside[SLUG] = named.slug
  const content = bodyOf({
    pageTypeSlug: named.pageTypeSlug,
    slug: named.slug,
    importFrom: importedFrom(at, typeAt),
    keys: carried.filter((one) => !one.uncommitted).map((one) => one.key),
    values: inside,
  })
  const kept = Object.keys(outside).length === 0 ? null : { path: at, values: outside }
  return { put: { path: at, content }, kept, parts, removes }
}

export type Folded =
  | {
      readonly puts: readonly Put[]
      readonly kept: readonly Kept[]
      readonly removes: readonly string[]
    }
  | { readonly refused: string }

export function foldedFor(root: string, named: readonly Naming[]): Folded {
  const puts: Put[] = []
  const kept: Kept[] = []
  const removes: string[] = []
  for (const one of named) {
    const composed = composedFor(root, one)
    if ("refused" in composed) return { refused: composed.refused }
    puts.push(composed.put)
    for (const part of composed.parts) puts.push(part)
    for (const gone of composed.removes) removes.push(gone)
    if (composed.kept !== null) kept.push(composed.kept)
  }
  return { puts, kept, removes }
}
