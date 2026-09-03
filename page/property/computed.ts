import { listField, type Frontmatter, textField } from "../frontmatter.ts"
import type { FileTree } from "../file-tree.ts"
import { statedOf } from "./record.ts"
import { answeredWhole } from "./answer-cache.ts"
import { shapeMarkOf } from "../shape/mark.ts"
import { globsIn, PAGE_PROPERTY_TYPE_GLOB } from "../page-types.ts"
import { blockOf, stringAt } from "../text/text.ts"
import type { Stated } from "./stated.ts"

export const COMPUTED = "computed"

const TYPE_SLUG = "type-slug"

const EXPRESSION = "expression"

const FROM = "from"

const BACK = "back-from"

const RELATION = "relation"

const KIND = "kind"

const OF = "of"

export interface PropertyType {
  readonly relPath: string
  readonly slug: string
  readonly kind: string
  readonly of: string | null
  readonly stated: Stated
}

export interface PropertyTypes {
  readonly standing: readonly string[]
  readonly types: readonly PropertyType[]
}

function propertyTypeAt(relPath: string, text: string): PropertyType | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  const slug = stringAt(fm, TYPE_SLUG)
  if (slug === null) return null
  return {
    relPath,
    slug,
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
  for (const relPath of standing) {
    const one = stated.get(relPath)
    if (one === undefined) continue
    types.push(one)
  }
  return { standing, types }
}

function heldPropertyTypes(tree: FileTree): PropertyTypes {
  const mark = shapeMarkOf(tree)
  const root = tree.root
  const make = (): PropertyTypes => propertyTypesIn(tree)
  if (mark === null || root === undefined) return make()
  const same = (one: PropertyTypes): PropertyTypes => one
  return answeredWhole(root, mark, "property-types", make, same, same)
}

const propertyTypes = new WeakMap<FileTree, PropertyTypes>()

export function propertyTypesOf(tree: FileTree): PropertyTypes {
  const held = propertyTypes.get(tree)
  if (held !== undefined) return held
  const made = heldPropertyTypes(tree)
  propertyTypes.set(tree, made)
  return made
}

export function answeredOn(fm: Frontmatter): boolean {
  return (
    textField(fm, EXPRESSION) !== null ||
    stringAt(fm, RELATION) !== null ||
    listField(fm, FROM).length > 0 ||
    stringAt(fm, BACK) !== null
  )
}

export function statedOn(fm: Frontmatter): boolean {
  return stringAt(fm, COMPUTED) === "true"
}

export function computedOn(fm: Frontmatter): boolean {
  return answeredOn(fm) || statedOn(fm)
}
