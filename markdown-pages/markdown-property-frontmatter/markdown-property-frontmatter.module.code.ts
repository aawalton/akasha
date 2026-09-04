import { AKASHA } from "@akasha/pages-system/checkout-roots"
import { pageStemOf } from "@akasha/pages-system/markdown-page-name"
import type { Property } from "@akasha/pages-system/markdown-property"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import {
  claimant,
  globsIn,
  matchesAny,
  PAGE_TYPE_GLOBS,
  type PageType,
  PROPERTY_GLOBS,
} from "../markdown-page-types/markdown-page-types.module.code.ts"
import { answeredWhole } from "../markdown-property-answer-cache/markdown-property-answer-cache.module.code.ts"
import {
  declarationsFromFiles,
  declarationsOf,
} from "../markdown-property-declarations/markdown-property-declarations.module.code.ts"
import {
  type Armed,
  armFor,
} from "../markdown-property-judge/markdown-property-judge.module.code.ts"
import { recordsFor } from "../markdown-property-record/markdown-property-record.module.code.ts"
import { registryOf } from "../markdown-property-registry/markdown-property-registry.module.code.ts"
import type {
  NamedSet,
  RecordField,
  Vocabulary,
} from "../markdown-property-stating/markdown-property-stating.module.code.ts"
import {
  keepAnswer,
  keptAnswer,
  keyFor,
} from "../markdown-property-type-cache/markdown-property-type-cache.module.code.ts"
import { backReference } from "../markdown-property-value/markdown-property-value.module.code.ts"
import {
  TYPE_KINDS,
  TYPE_NAMES,
  TYPE_SETS,
} from "../markdown-property-vocabulary/markdown-property-vocabulary.module.code.ts"
import { shapeMarkOf } from "../markdown-shape-mark/markdown-shape-mark.module.code.ts"
import { blockOf, NONE, stringAt } from "../markdown-text-at/markdown-text-at.module.code.ts"

export const PROPERTY_ROOTS: readonly string[] = PROPERTY_GLOBS.map((one) =>
  one
    .split("/")
    .filter((each) => !each.includes("*"))
    .join("/")
)

export function vocabularyOf(tree: FileTree): Vocabulary {
  // THE NAMES ARE STATED IN CODE, NOT READ FROM PAGES. They used to be resolved through the page
  // type claiming `pages/page-property-type/`; that page type was ablated, so every resolution
  // answered `names: null` and the validator could not say what it admits. Only the record fields
  // still come off the tree, because those are declared by the properties themselves rather than
  // by the vocabulary.
  return {
    names: TYPE_NAMES,
    records: recordsFor(declarationsOf(tree).bySlug, TYPE_KINDS),
    sets: TYPE_SETS,
    why: null,
  }
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
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const make = (): Vocabulary => vocabularyOf(tree)
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

export function chainOf(
  type: PageType,
  tree: FileTree,
  index?: ReadonlyMap<string, string>
): Specifiers {
  const bySlug = index ?? typeIndex(tree)
  const relPaths: string[] = []
  const seen = new Set<string>()
  let at = type.relPath
  for (;;) {
    if (seen.has(at))
      return {
        relPaths: null,
        why: `the \`extends-slug\` chain above \`${type.slug}\` returns to \`${pageStemOf(at)}\``,
      }
    seen.add(at)
    relPaths.push(at)
    const text = tree.open(at)
    if (text === null)
      return { relPaths: null, why: `\`${at}\` is not in the repo this call would produce` }
    const { fm, why } = blockOf(text)
    if (why !== null) return { relPaths: null, why: `\`${at}\` — ${why}` }
    const above = stringAt(fm, "extends-slug")
    if (above === null)
      return {
        relPaths: null,
        why: `\`${at}\` declares no \`extends-slug\`, so what it extends is unstated`,
      }
    if (above === NONE) return { relPaths, why: null }
    const next = bySlug.get(above)
    if (next === undefined)
      return {
        relPaths: null,
        why: `\`${at}\` extends \`${above}\`, which is the slug of no page type here`,
      }
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
