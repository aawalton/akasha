import {
  type Answer,
  type FileChange,
  refusing,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { keysGoingInEntries } from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import { without } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  keyOf,
  listIn,
  literalIn,
  matchingIn,
  valuesIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  carriedUnder,
  type Declared,
  filedUnder,
  typesDeclaring,
  withinOf,
} from "akasha/change/modules/page-property-carrying/page-property-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const PROPERTY_SLUG = "propertySlug"

const PROPERTIES = "properties"

const PARTS = "parts"

const PAGE_PROPERTY = "pageProperty"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const ENTRY_SHAPE = "page-property-entry"

const FILE_PROPERTY = "file-property"

const QUALIFIED = "qualified"

const KINDS: ReadonlySet<string> = new Set([PAGE_TYPE, RECORD_PROPERTY, ENTRY_SHAPE])

const NO_KEYS: ReadonlySet<string> = new Set()

function namesNothing(named: string): string {
  return `\`${named}\` names no page property, so no property is taken away`
}

function noBody(path: string): string {
  return `\`${path}\` holds no body, so nothing is taken out of it`
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
  for (const one of carriedUnder(world, types, read.key, null)) {
    paths.add(one.path)
    if (!read.beside || typeof one.held !== "string") continue
    const at = besideAt(one.path, read.slug, one.held)
    if (at !== null && world.bodyOf(at) !== null) files.add(at)
  }
  return { paths, files }
}

function ownerIn(source: ts.SourceFile): readonly ts.ObjectLiteralExpression[] {
  const held = literalIn(source)
  return held === null ? [] : [held]
}

function keyGoneIn(
  text: string,
  source: ts.SourceFile,
  owners: readonly ts.ObjectLiteralExpression[],
  key: string
): readonly Splice[] {
  const found: Splice[] = []
  for (const owner of owners) {
    const at = owner.properties.findIndex(
      (one) => ts.isPropertyAssignment(one) && keyOf(one) === key
    )
    if (owner.properties[at] === undefined) continue
    found.push(without(text, source, owner, owner.properties, at))
  }
  return found
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

function adriftIn(world: World, declared: readonly Declared[]): string | null {
  for (const one of declared) {
    if (one.kind === PAGE_TYPE) continue
    if (!KINDS.has(one.kind)) {
      return `\`${one.kind}/${one.slug}\` is no page type, record property or entry shape`
    }
    if (typesDeclaring(world, one.id).length === 0) {
      return `no page type declares \`${one.kind}/${one.slug}\`, so where its values sit is read from nothing`
    }
  }
  return null
}

function recordedIn(
  world: World,
  declared: readonly Declared[],
  left: (one: string) => boolean
): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, Set<string>>()
  for (const one of declared) {
    if (one.kind !== RECORD_PROPERTY) continue
    const within = withinOf(world, one, null)
    if (within === null) continue
    for (const path of within.carrying) {
      if (!left(path)) continue
      const held = found.get(path) ?? new Set<string>()
      held.add(within.key)
      found.set(path, held)
    }
  }
  return found
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
  const declared = world.index.declaringOf(read.id)
  const why = adriftIn(world, declared)
  if (why !== null) return refusing(`\`${given.property}\` is declared, and ${why}`)
  const carrying = carryingIn(world, read, typesDeclaring(world, read.id))
  const claimed = claimsOver(world, read)
  if (typeof claimed === "string") return refusing(claimed)
  const gone = new Set([...claimed, ...carrying.files])
  const left = (one: string): boolean => !gone.has(one)
  const keyed = new Set([...carrying.paths].filter(left))
  const declaring = new Set(declared.map((one) => one.path).filter(left))
  const parting = new Set(
    namersIn(world, read.path, PARTS)
      .map((one) => one.path)
      .filter(left)
  )
  const recorded = recordedIn(world, declared, left)
  const entried = new Set(
    declared
      .filter((one) => one.kind === ENTRY_SHAPE)
      .flatMap((one) => filedUnder(world, one))
      .filter(left)
  )
  const edits: FileChange[] = []
  for (const path of new Set([...keyed, ...declaring, ...parting, ...recorded.keys()])) {
    const text = world.textOf(path)
    if (text === null) return refusing(noBody(path))
    const source = parsedAs(path, text)
    const spots: Splice[] = [
      ...(keyed.has(path) ? keyGoneIn(text, source, ownerIn(source), read.key) : []),
      ...[...(recorded.get(path) ?? NO_KEYS)].flatMap((one) =>
        keyGoneIn(text, source, valuesIn(source, one), read.key)
      ),
    ]
    const held = declaring.has(path) ? declarationGone(text, source, given.property) : null
    const part = parting.has(path) ? partGone(text, source, given.property, read.slug) : null
    for (const one of [held, part]) {
      if (one !== null) spots.push(one)
    }
    edits.push(...splicedIn(path, text, spots))
  }
  for (const path of entried) {
    const text = world.textOf(path)
    if (text === null) return refusing(noBody(path))
    edits.push(...splicedIn(path, text, keysGoingInEntries(path, text, new Set([read.key]))))
  }
  for (const path of gone) edits.push({ kind: "remove", path })
  return stating(edits)
}

export function runChange(world: World, given: Asked): Answer {
  return removePageProperty(world, given)
}
