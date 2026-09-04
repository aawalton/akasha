import { listedAt } from "@akasha/indexes"
import { fileKeysAt } from "@akasha/indexes/entries"
import { bodyOf, importedFrom, unnamedIn } from "@akasha/pages-system/page-body"
import { type Carried, propertiesFrom, sourceIn } from "@akasha/pages-system/page-type-properties"
import { textAt, type Value, valueAt } from "@akasha/pages-system/page-value"

const PAGE_TYPE = "page-type"

const PLURAL = "pluralSlug"

const ID = "id"

export type Naming = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: Value
  readonly merge?: boolean
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
  | { readonly put: Put; readonly kept: Kept | null }
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

export function besideItsPage(root: string, carried: readonly Carried[]): boolean {
  const filed = fileKeysAt(root)
  return carried.some((one) => filed.has(one.propertySlug))
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

export function pathFor(
  typeAt: string,
  plural: string,
  pageTypeSlug: string,
  slug: string,
  besideIt: boolean
): string {
  const above = typeAt.split("/").slice(0, -1)
  const folder = above.join("/")
  const under = above.at(-1) === plural ? PAGES : plural
  const own = besideIt ? `/${folderFor(plural, pageTypeSlug, slug)}` : ""
  return `${folder}/${under}${own}/${slug}.${pageTypeSlug}.ts`
}

function saying(keys: readonly string[]): string {
  return keys.map((one) => `\`${one}\``).join(", ")
}

export function composedFor(root: string, named: Naming): Composed {
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
  for (const one of carried) {
    const stated = one.key in named.values
    if (!stated && !(one.key in already)) continue
    const value = stated ? named.values[one.key] : already[one.key]
    if (one.uncommitted) outside[one.key] = value
    else inside[one.key] = value
  }
  const wasId = was === null ? undefined : was[ID]
  if (inside[ID] === undefined && wasId !== undefined) inside[ID] = wasId
  const content = bodyOf({
    pageTypeSlug: named.pageTypeSlug,
    slug: named.slug,
    importFrom: importedFrom(at, typeAt),
    keys: carried.filter((one) => !one.uncommitted).map((one) => one.key),
    values: inside,
  })
  const kept = Object.keys(outside).length === 0 ? null : { path: at, values: outside }
  return { put: { path: at, content }, kept }
}

export type Folded =
  | { readonly puts: readonly Put[]; readonly kept: readonly Kept[] }
  | { readonly refused: string }

export function foldedFor(root: string, named: readonly Naming[]): Folded {
  const puts: Put[] = []
  const kept: Kept[] = []
  for (const one of named) {
    const composed = composedFor(root, one)
    if ("refused" in composed) return { refused: composed.refused }
    puts.push(composed.put)
    if (composed.kept !== null) kept.push(composed.kept)
  }
  return { puts, kept }
}
