import {
  refusing,
  splicedIn,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { without } from "akasha/changes/modules/literal-splicing/literal-splicing.module.code.ts"
import { claimedIn } from "akasha/changes/modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  keyOf,
  listIn,
  literalIn,
  matchingIn,
} from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { addressIn } from "akasha/pages/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/pages/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const PROPERTY_SLUG = "propertySlug"

const PROPERTIES = "properties"

const PARTS = "parts"

const PAGE_PROPERTY = "pageProperty"

const PAGE_TYPE = "page-type"

const FILE_PROPERTY = "file-property"

const QUALIFIED = "qualified"

function namesNothing(named: string): string {
  return `\`${named}\` names no page property, so no property is taken away`
}

export type Asked = {
  readonly property: string
}

type Reading = {
  readonly path: string
  readonly id: string
  readonly slug: string
  readonly key: string
  readonly beside: boolean
  readonly value: Value
}

function readingOf(world: World, given: Asked): Reading | string {
  const named = addressIn(given.property)
  if (named.kind !== QUALIFIED) return namesNothing(given.property)
  const listed = world.index.listedAt(named.pageTypeSlug, named.slug)[0]
  if (listed === undefined) return namesNothing(given.property)
  const value = pageIn(world, listed.path)
  const slug = value === null ? null : value[PROPERTY_SLUG]
  if (value === null || typeof slug !== "string") return namesNothing(given.property)
  return {
    path: listed.path,
    id: listed.id,
    slug,
    key: exportedAs(slug),
    beside: world.index.kindsUnder(FILE_PROPERTY).has(named.pageTypeSlug),
    value,
  }
}

type Carrying = {
  readonly paths: ReadonlySet<string>
  readonly files: ReadonlySet<string>
}

function carryingIn(world: World, read: Reading, types: readonly string[]): Carrying {
  const paths = new Set<string>()
  const files = new Set<string>()
  for (const type of types) {
    for (const kind of world.index.kindsUnder(type)) {
      for (const [path, value] of world.index.valuesByPath(kind)) {
        const held = value[read.key]
        if (held === undefined) continue
        paths.add(path)
        if (!read.beside || typeof held !== "string") continue
        const at = besideAt(path, read.slug, held)
        if (at !== null && world.bodyOf(at) !== null) files.add(at)
      }
    }
  }
  return { paths, files }
}

function keyGone(text: string, source: ts.SourceFile, key: string): Splice | null {
  const owner = literalIn(source)
  if (owner === null) return null
  const at = owner.properties.findIndex((one) => ts.isPropertyAssignment(one) && keyOf(one) === key)
  if (owner.properties[at] === undefined) return null
  return without(text, source, owner, owner.properties, at)
}

function declarationGone(text: string, source: ts.SourceFile, named: string): Splice | null {
  const list = listIn(source, PROPERTIES)
  if (list === null) return null
  const at = matchingIn(list, PAGE_PROPERTY, named)[0]
  if (at === undefined) return null
  return without(text, source, list, list.elements, at)
}

function partGone(text: string, source: ts.SourceFile, named: string, slug: string): Splice | null {
  const list = listIn(source, PARTS)
  if (list === null) return null
  const at = list.elements.findIndex(
    (one) => ts.isStringLiteral(one) && (one.text === named || one.text === slug)
  )
  if (at < 0) return null
  return without(text, source, list, list.elements, at)
}

function declaredElsewhere(world: World, read: Reading, named: string): string | null {
  for (const one of world.index.declaringOf(read.id)) {
    if (one.kind === PAGE_TYPE) continue
    return (
      `\`${named}\` is declared by \`${one.kind}/${one.slug}\`, which is no page type,` +
      " and only a page type's declaration is taken away here"
    )
  }
  return null
}

function claimsOver(world: World, read: Reading): readonly string[] | string {
  try {
    return claimedIn(world, read.path, read.value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return `${why}, so what \`${read.path}\` keeps beside it was not worked out`
  }
}

export function removePageProperty(world: World, given: Asked): Answer {
  const read = readingOf(world, given)
  if (typeof read === "string") return refusing(read)
  const why = declaredElsewhere(world, read, given.property)
  if (why !== null) return refusing(why)
  const types = world.index.declaringOf(read.id).map((one) => one.path)
  const carrying = carryingIn(
    world,
    read,
    world.index.declaringOf(read.id).map((one) => one.slug)
  )
  const claimed = claimsOver(world, read)
  if (typeof claimed === "string") return refusing(claimed)
  const gone = new Set([...claimed, ...carrying.files])
  const left = (one: string): boolean => !gone.has(one)
  const keyed = new Set([...carrying.paths].filter(left))
  const declaring = new Set(types.filter(left))
  const parting = new Set(
    namersIn(world, read.path, PARTS)
      .map((one) => one.path)
      .filter(left)
  )
  const edits: FileChange[] = []
  for (const path of new Set([...keyed, ...declaring, ...parting])) {
    const text = world.textOf(path)
    if (text === null) return refusing(`\`${path}\` holds no body, so nothing is taken out of it`)
    const source = parsedAs(path, text)
    const spots: Splice[] = []
    const key = keyed.has(path) ? keyGone(text, source, read.key) : null
    const held = declaring.has(path) ? declarationGone(text, source, given.property) : null
    const part = parting.has(path) ? partGone(text, source, given.property, read.slug) : null
    for (const one of [key, held, part]) {
      if (one !== null) spots.push(one)
    }
    edits.push(...splicedIn(path, text, spots))
  }
  for (const path of gone) edits.push({ kind: "remove", path })
  return stating(edits)
}

export function runChange(world: World, given: Asked): Answer {
  return removePageProperty(world, given)
}
