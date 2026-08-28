import { propertyTypesOf } from "./computed.ts"
import { claimant, globsIn, matchesAny, PAGE_TYPE_GLOBS, placeOf, reposOf, PROPERTY_GLOBS, type PageType } from "../page-types.ts"
import { NONE, blockOf, stringAt } from "../text/text.ts"
import { pageStemOf } from "../name/name.ts"
import { backReference, SELECT, TYPE_SLUG, TYPE_VOCABULARY } from "./value.ts"
import { armFor, type Armed } from "./judge.ts"
import { declarationsFromFiles, declarationsOf } from "./declarations.ts"
import type { Property } from "./property.ts"
import type { NamedSet, Vocabulary } from "./stated.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import { type FileTree } from "../file-tree.ts"
import { indexStamp, registryOf } from "./registry.ts"
import { AKASHA, REPOS } from "../../repo/roots/roots.ts"
import { recordsFor } from "./record.ts"
import type { RecordField } from "./stated.ts"
import { answeredWhole } from "./answer-cache.ts"
import { keepAnswer, keptAnswer, keyFor } from "./type-cache.ts"

export const PROPERTY_ROOTS: readonly string[] = PROPERTY_GLOBS.map((one) =>
  one
    .split("/")
    .filter((each) => !each.includes("*"))
    .join("/")
)

function reposRead(tree: FileTree): readonly string[] {
  const roots = tree.roots
  if (roots === undefined) return [AKASHA]
  return REPOS.filter((one) => roots[one] !== undefined)
}

export function vocabularyOf(types: readonly PageType[], tree: FileTree): Vocabulary {
  const naming = types.find((one) => one.slug === TYPE_VOCABULARY)
  if (naming === undefined)
    return { names: null, records: null, sets: null, why: `no page type named \`${TYPE_VOCABULARY}\` stands here, so nothing names the types` }
  const claimedBy = reposOf(naming)
  if (claimedBy.length === 0)
    return { names: null, records: null, sets: null, why: `\`${TYPE_VOCABULARY}\` claims no files, so nothing names the types` }
  const read = reposRead(tree)
  const unread = claimedBy.filter((one) => !read.includes(one))
  if (unread.length === claimedBy.length) {
    const here = read.length === 0 ? "no repository stands here" : `this reads \`${read.join("` and `")}\``
    return {
      names: null,
      records: null,
      sets: null,
      why: `\`${TYPE_VOCABULARY}\` claims its files in \`${unread.join("` and `")}\`, which nothing here reads — ${here}`,
    }
  }
  const place = placeOf(naming.slug)
  const { standing, types: stated } = propertyTypesOf(tree)
  if (standing.length === 0)
    return { names: null, records: null, sets: null, why: `\`${TYPE_VOCABULARY}\` claims \`${place}\` and nothing stands there` }
  const named = new Map<string, string>()
  const kinds = new Map<string, string>()
  const sets = new Map<string, NamedSet>()
  const twice: string[] = []
  for (const one of stated) {
    const first = named.get(one.slug)
    if (first === undefined) {
      named.set(one.slug, one.relPath)
      kinds.set(one.slug, one.kind)
      if (one.kind === SELECT && one.of !== null) sets.set(one.slug, { of: one.of, stated: one.stated })
    }
    else twice.push(`\`${one.slug}\` is stated by \`${first}\` and by \`${one.relPath}\``)
  }
  if (twice.length > 0)
    return {
      names: null,
      records: null,
      sets: null,
      why: `two pages state one \`${TYPE_SLUG}:\`, so a name resolves to neither — ${twice.join("; ")}`,
    }
  if (named.size === 0)
    return {
      names: null,
      records: null,
      sets: null,
      why: `nothing at \`${place}\` states a \`${TYPE_SLUG}:\`, which is where a type's own name is written`,
    }
  return { names: new Set(named.keys()), records: recordsFor(declarationsOf(tree).bySlug, kinds), sets, why: null }
}

interface VocabularyData {
  readonly names: readonly string[] | null
  readonly records: readonly (readonly [string, readonly RecordField[]])[] | null
  readonly sets: readonly (readonly [string, NamedSet])[] | null
  readonly why: string | null
}

const asData = (one: Vocabulary): VocabularyData => ({
  names: one.names === null ? null : [...one.names],
  records: one.records === null ? null : [...one.records],
  sets: one.sets === null ? null : [...one.sets],
  why: one.why,
})

const fromData = (one: VocabularyData): Vocabulary => ({
  names: one.names === null ? null : new Set(one.names),
  records: one.records === null ? null : new Map(one.records),
  sets: one.sets === null ? null : new Map(one.sets),
  why: one.why,
})

const vocabularies = new WeakMap<FileTree, Vocabulary>()

export function vocabularyFor(tree: FileTree): Vocabulary {
  const standing = vocabularies.get(tree)
  if (standing !== undefined) return standing
  const made = heldVocabulary(tree)
  vocabularies.set(tree, made)
  return made
}

function heldVocabulary(tree: FileTree): Vocabulary {
  const shape = shapeMarkOf(tree)
  const mark = shape === null ? null : `${shape}-${indexStamp()}`
  const root = tree.root
  const make = (): Vocabulary => vocabularyOf(registryOf(tree), tree)
  if (mark === null || root === undefined) return make()
  return answeredWhole(root, mark, "vocabulary", make, asData, fromData)
}

export type Specifiers =
  | { readonly relPaths: readonly string[]; readonly why: null }
  | { readonly relPaths: null; readonly why: string }

const indexes = new WeakMap<FileTree, ReadonlyMap<string, string>>()

function typeIndex(tree: FileTree): ReadonlyMap<string, string> {
  const standing = indexes.get(tree)
  if (standing !== undefined) return standing
  const bySlug = new Map<string, string>()
  for (const one of registryOf(tree)) if (!bySlug.has(one.slug)) bySlug.set(one.slug, one.relPath)
  indexes.set(tree, bySlug)
  return bySlug
}

export function chainOf(type: PageType, tree: FileTree, index?: ReadonlyMap<string, string>): Specifiers {
  const bySlug = index ?? typeIndex(tree)
  const relPaths: string[] = []
  const seen = new Set<string>()
  let at = type.relPath
  for (;;) {
    if (seen.has(at))
      return { relPaths: null, why: `the \`extends-slug\` chain above \`${type.slug}\` returns to \`${pageStemOf(at)}\`` }
    seen.add(at)
    relPaths.push(at)
    const text = tree.open(at)
    if (text === null) return { relPaths: null, why: `\`${at}\` is not in the repo this call would produce` }
    const { fm, why } = blockOf(text)
    if (why !== null) return { relPaths: null, why: `\`${at}\` — ${why}` }
    const above = stringAt(fm, "extends-slug")
    if (above === null)
      return { relPaths: null, why: `\`${at}\` declares no \`extends-slug\`, so what it extends is unstated` }
    if (above === NONE) return { relPaths, why: null }
    const next = bySlug.get(above)
    if (next === undefined)
      return { relPaths: null, why: `\`${at}\` extends \`${above}\`, which is the slug of no page type here` }
    at = next
  }
}

export function pageTypeChain(relPath: string, repo: string, tree: FileTree): Specifiers {
  const ownRepo = tree.roots !== undefined || repo === AKASHA
  if (ownRepo && matchesAny(relPath, globsIn(tree.roots, PAGE_TYPE_GLOBS)))
    return { relPaths: null, why: "the registry requires no reading of its own files" }
  const claim = claimant(relPath, registryOf(tree))
  return claim.type === null ? { relPaths: null, why: claim.why } : chainOf(claim.type, tree)
}

export function propertiesFor(
  type: PageType,
  tree: FileTree,
  index?: ReadonlyMap<string, string>
): { properties: readonly Property[] | null; why: string | null } {
  const { relPaths, why } = chainOf(type, tree, index)
  if (relPaths === null) return { properties: null, why }
  const { bySlug, fault } = declarationsFromFiles(tree)
  if (fault !== null) return { properties: null, why: fault }
  const properties: Property[] = []
  for (const slug of new Set(relPaths.map((at) => pageStemOf(at))))
    for (const one of bySlug.get(slug) ?? []) properties.push(one)
  properties.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))
  return { properties, why: null }
}

export interface CompiledPageType {
  readonly slug: string
  readonly chain: readonly string[] | null
  readonly properties: readonly Property[] | null
  readonly armed: ReadonlyMap<Property, Armed>
  readonly ownType: (property: Property, named: string) => Armed
  readonly why: string | null
}

interface Ground {
  readonly tree: FileTree
  readonly rules: Map<string, Armed>
  readonly held: Map<string, CompiledPageType>
}

const grounds = new WeakMap<FileTree, Ground>()

function groundOf(tree: FileTree): Ground {
  const standing = grounds.get(tree)
  if (standing !== undefined) return standing
  const made: Ground = { tree, rules: new Map(), held: new Map() }
  grounds.set(tree, made)
  return made
}

function armOnce(property: Property, stated: string, ground: Ground): Armed {
  const at = property.at + " " + stated
  const standing = ground.rules.get(at)
  if (standing !== undefined) return standing
  const made = armFor(property, stated, vocabularyFor(ground.tree))
  ground.rules.set(at, made)
  return made
}

interface Compiled {
  readonly properties: readonly Property[] | null
  readonly why: string | null
}

function heldProperties(type: PageType, tree: FileTree, chain: readonly string[] | null): Compiled {
  const root = tree.root
  const key = root === undefined || chain === null ? null : keyFor(tree, chain)
  if (root === undefined || key === null) return propertiesFor(type, tree, typeIndex(tree))
  const kept = keptAnswer(root, type.slug, key)
  if (kept !== null) return kept
  const made = propertiesFor(type, tree, typeIndex(tree))
  keepAnswer(root, type.slug, key, made)
  return made
}

export function compiledPageTypeFor(type: PageType, tree: FileTree): CompiledPageType {
  const ground = groundOf(tree)
  const standing = ground.held.get(type.relPath)
  if (standing !== undefined) return standing
  const chain = chainOf(type, tree, typeIndex(tree)).relPaths
  const { properties, why } = heldProperties(type, tree, chain)
  const armed = new Map<Property, Armed>()
  for (const one of properties ?? []) {
    if (backReference(one.type) !== null) continue
    armed.set(one, armOnce(one, one.type, ground))
  }
  const made: CompiledPageType = {
    slug: type.slug,
    chain: chain === null ? null : chain.map((at) => pageStemOf(at)),
    properties,
    armed,
    ownType: (property, named) => armOnce(property, named, ground),
    why,
  }
  ground.held.set(type.relPath, made)
  return made
}
