import { listField, type Frontmatter, textField } from "../frontmatter.ts"
import type { FileTree, Open } from "../file-tree.ts"
import { statedOf } from "./record.ts"
import { answeredWhole } from "./answer-cache.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import { globsIn, PAGE_PROPERTY_TYPE_GLOB } from "../page-types.ts"
import { blockOf, stringAt } from "../text/text.ts"
import type { Stated } from "./stated.ts"

export const REACHES = "reaches"

export const COMPUTED = "computed"

const TYPE_SLUG = "type-slug"

const TYPE = "type"

const EXPRESSION = "expression"

const FROM = "from"

const BACK = "back-from"

const RELATION = "relation"

const KIND = "kind"

const OF = "of"

export interface PropertyType {
  readonly relPath: string
  readonly slug: string
  readonly reaches: boolean
  readonly kind: string
  readonly of: string | null
  readonly stated: Stated
}

export interface PropertyTypes {
  readonly standing: readonly string[]
  readonly types: readonly PropertyType[]
  readonly reaching: ReadonlySet<string>
}

export function reachingIn(paths: readonly string[], open: Open): ReadonlySet<string> {
  const found = new Set<string>()
  for (const relPath of paths) {
    const text = open(relPath)
    if (text === null) continue
    const { fm, why } = blockOf(text)
    if (why !== null) continue
    if (stringAt(fm, REACHES) !== "true") continue
    const named = stringAt(fm, TYPE_SLUG)
    if (named !== null) found.add(named)
  }
  return found
}

function propertyTypeAt(relPath: string, text: string): PropertyType | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  const slug = stringAt(fm, TYPE_SLUG)
  if (slug === null) return null
  return {
    relPath,
    slug,
    reaches: stringAt(fm, REACHES) === "true",
    kind: stringAt(fm, KIND) ?? "",
    of: stringAt(fm, OF),
    stated: statedOf(fm),
  }
}

function statedOver(relPaths: readonly string[], tree: FileTree): ReadonlyMap<string, PropertyType> {
  const made = new Map<string, PropertyType>()
  for (const relPath of relPaths) {
    const text = tree.open(relPath)
    if (text === null) continue
    const one = propertyTypeAt(relPath, text)
    if (one !== null) made.set(relPath, one)
  }
  return made
}

function propertyTypesIn(tree: FileTree): PropertyTypes {
  const standing = tree.paths(globsIn(tree.roots, [PAGE_PROPERTY_TYPE_GLOB]))
  const stated = statedOver(standing, tree)
  const types: PropertyType[] = []
  const reaching = new Set<string>()
  for (const relPath of standing) {
    const one = stated.get(relPath)
    if (one === undefined) continue
    if (one.reaches) reaching.add(one.slug)
    types.push(one)
  }
  return { standing, types, reaching }
}

interface PropertyTypesData {
  readonly standing: readonly string[]
  readonly types: readonly PropertyType[]
  readonly reaching: readonly string[]
}

const asTypesData = (one: PropertyTypes): PropertyTypesData => ({
  standing: one.standing,
  types: one.types,
  reaching: [...one.reaching],
})

const fromTypesData = (one: PropertyTypesData): PropertyTypes => ({
  standing: one.standing,
  types: one.types,
  reaching: new Set(one.reaching),
})

function heldPropertyTypes(tree: FileTree): PropertyTypes {
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const make = (): PropertyTypes => propertyTypesIn(tree)
  if (mark === null || root === undefined) return make()
  return answeredWhole(root, mark, "property-types", make, asTypesData, fromTypesData)
}

const propertyTypes = new WeakMap<FileTree, PropertyTypes>()

export function propertyTypesOf(tree: FileTree): PropertyTypes {
  const held = propertyTypes.get(tree)
  if (held !== undefined) return held
  const made = heldPropertyTypes(tree)
  propertyTypes.set(tree, made)
  return made
}

export function reachingOf(tree: FileTree): ReadonlySet<string> {
  return propertyTypesOf(tree).reaching
}

export function reachedFor(type: string | null, reaching: ReadonlySet<string>): boolean {
  return type !== null && reaching.has(type)
}

export function answeredOn(fm: Frontmatter, reaching: ReadonlySet<string>): boolean {
  return (
    reachedFor(stringAt(fm, TYPE), reaching) ||
    textField(fm, EXPRESSION) !== null ||
    stringAt(fm, RELATION) !== null ||
    listField(fm, FROM).length > 0 ||
    stringAt(fm, BACK) !== null
  )
}

export function statedOn(fm: Frontmatter): boolean {
  return stringAt(fm, COMPUTED) === "true"
}

export function computedOn(fm: Frontmatter, reaching: ReadonlySet<string>): boolean {
  return answeredOn(fm, reaching) || statedOn(fm)
}
