import {
  type FileChange,
  missing,
  refusing,
  type Said,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { objectOf } from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import { entriesBeside } from "akasha/change/modules/page-property-carrying/page-property-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import ts from "typescript"

const BARE = "bare"

const LINE = "\n"

const STEP = "."

const SLUG = "slug"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly field: string
  readonly target: string
  readonly by: string
  readonly atMost?: number | null
}

export function addressesBy(
  world: World,
  target: string,
  by: string
): ReadonlyMap<string, string> | string {
  if (world.index.propertiesIfNamed(target) === null) return `\`${target}\` names no page type`
  const found = new Map<string, string>()
  for (const kind of world.index.kindsUnder(target)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      const held = value[by]
      const slug = value[SLUG]
      if (typeof held !== "string" || typeof slug !== "string") continue
      const address = `${partedIn(path)?.pageType ?? kind}/${slug}`
      const already = found.get(held)
      if (already !== undefined && already !== address) {
        return `\`${held}\` under \`${by}\` names both \`${already}\` and \`${address}\``
      }
      found.set(held, address)
    }
  }
  return found
}

export function stringsUnder(node: ts.Expression, steps: readonly string[]): ts.StringLiteral[] {
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.flatMap((one) => stringsUnder(one, steps))
  }
  const [first, ...rest] = steps
  if (first === undefined) return ts.isStringLiteral(node) ? [node] : []
  if (!ts.isObjectLiteralExpression(node)) return []
  const found: ts.StringLiteral[] = []
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text === first) found.push(...stringsUnder(one.initializer, rest))
  }
  return found
}

function lineSpots(
  at: string,
  line: string,
  given: Asked,
  addresses: ReadonlyMap<string, string>
): readonly Splice[] | string {
  const source = ts.parseJsonText(at, line)
  const row = objectOf(source)
  if (row === null) return []
  const spots: Splice[] = []
  for (const held of stringsUnder(row, given.field.split(STEP))) {
    if (addressIn(held.text).kind !== BARE) continue
    const now = addresses.get(held.text)
    if (now === undefined) {
      return `\`${at}\` names \`${held.text}\`, and no \`${given.target}\` states it under \`${given.by}\``
    }
    spots.push({ from: held.getStart(source), to: held.getEnd(), put: JSON.stringify(now) })
  }
  return spots
}

export function spotsIn(
  at: string,
  text: string,
  given: Asked,
  addresses: ReadonlyMap<string, string>
): readonly Splice[] | string {
  const found: Splice[] = []
  let from = 0
  for (const line of text.split(LINE)) {
    const spots = lineSpots(at, line, given, addresses)
    if (typeof spots === "string") return spots
    for (const one of spots) found.push({ from: from + one.from, to: from + one.to, put: one.put })
    from = from + line.length + LINE.length
  }
  return found
}

function writtenFor(
  world: World,
  entried: Declared,
  path: string,
  value: Value,
  given: Asked,
  addresses: ReadonlyMap<string, string>
): readonly FileChange[] | string {
  const held = value[given.key]
  if (typeof held !== "string") return []
  const edits: FileChange[] = []
  for (const at of entriesBeside(world, path, held, entried.propertySlug, entried.uncommitted)) {
    const text = world.textOf(at)
    if (text === null) return `\`${at}\` could not be read`
    const spots = spotsIn(at, text, given, addresses)
    if (typeof spots === "string") return spots
    if (spots.length > 0) edits.push(...splicedIn(at, text, spots))
  }
  return edits
}

function entriedFor(world: World, given: Asked): Declared | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) return `a \`${given.pageType}\` has no property under \`${given.key}\``
  if (held.pageTypeSlug !== ENTRY_PROPERTY) {
    return `\`${given.key}\` on a \`${given.pageType}\` keeps no entries beside the page`
  }
  return held
}

export function qualifyRelationByKeyOnEveryPage(world: World, given: Asked): Said {
  if (given.field.length === 0) return refusing(missing("field"))
  const entried = entriedFor(world, given)
  if (typeof entried === "string") return refusing(entried)
  const addresses = addressesBy(world, given.target, given.by)
  if (typeof addresses === "string") return refusing(addresses)
  const atMost = given.atMost ?? null
  const seen = new Set<string>()
  const edits: FileChange[] = []
  let pages = 0
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && pages >= atMost) return stating(edits)
      if (seen.has(path)) continue
      seen.add(path)
      const made = writtenFor(world, entried, path, value, given, addresses)
      if (typeof made === "string") return refusing(made)
      if (made.length > 0) pages = pages + 1
      edits.push(...made)
    }
  }
  if (edits.length === 0) {
    return refusing(`no \`${given.pageType}\` names a page by a bare name under \`${given.field}\``)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return qualifyRelationByKeyOnEveryPage(world, given)
}
