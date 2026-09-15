import {
  refusing,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "akasha/change/modules/answer/change-answer.module.types.ts"
import {
  keyOf,
  listIn,
  statedIn,
  valuesIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import {
  eachTarget,
  filedById,
  type Known,
  reaches,
  type Wanted,
} from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  recordsIn,
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const BARE = "bare"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly field?: string | null
  readonly atMost?: number | null
}

export type Naming = {
  readonly wanted: Wanted
  readonly known: Known
  readonly pageTypeOf: (id: string) => string | null
}

export function pageTypeIn(known: Known, id: string): string | null {
  const one = filedById(known, id)
  return one === null ? null : (partedIn(one.path)?.pageType ?? null)
}

export type Carried = {
  readonly path: string
  readonly spelled: ReadonlyMap<string, string>
}

export function bareIn(held: unknown): readonly string[] {
  const names = typeof held === "string" ? [held] : Array.isArray(held) ? held : []
  const found: string[] = []
  for (const one of names) {
    if (typeof one !== "string" || addressIn(one).kind !== BARE) continue
    if (!found.includes(one)) found.push(one)
  }
  return found
}

export function underIn(given: Asked): string {
  return given.field ?? given.key
}

export function saidOf(given: Asked): string {
  const field = given.field ?? null
  if (field === null) return `\`${given.key}\` on a \`${given.pageType}\``
  return `\`${field}\` in a \`${given.key}\` entry on a \`${given.pageType}\``
}

export function namingFor(world: World, given: Asked): Naming | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) return `a \`${given.pageType}\` has no property under \`${given.key}\``
  const known = world.index.knownIn()
  const under = slugOf(held.pagePropertySlug)
  const field = given.field ?? null
  const slug = field === null ? under : known.fieldOfKey(under, field)
  if (slug === null) return `a \`${given.key}\` entry has no field under \`${field}\``
  const wanted = known.targetOf(slug)
  if (eachTarget(wanted).length === 0) {
    return `${saidOf(given)} declares no page type to reach`
  }
  return { wanted, known, pageTypeOf: (id) => pageTypeIn(known, id) }
}

export function qualifiedBy(naming: Naming, named: string): string | { readonly refused: string } {
  const reached = reaches(named, naming.wanted, naming.known)
  if ("refused" in reached) return reached
  const pageTypeSlug = naming.pageTypeOf(reached.id)
  if (pageTypeSlug === null) return { refused: `\`${named}\` reaches a page of no page type` }
  return namedAs(pageTypeSlug, named, null)
}

export function bareOn(value: Value, given: Asked): readonly string[] {
  const field = given.field ?? null
  if (field === null) return bareIn(value[given.key])
  const found: string[] = []
  for (const entry of recordsIn(value[given.key])) {
    for (const one of bareIn(entry[field])) {
      if (!found.includes(one)) found.push(one)
    }
  }
  return found
}

export function spelledOver(
  world: World,
  naming: Naming,
  given: Asked
): readonly Carried[] | string {
  const found: Carried[] = []
  const atMost = given.atMost ?? null
  const under = underIn(given)
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      const bare = bareOn(value, given)
      if (bare.length === 0) continue
      const spelled = new Map<string, string>()
      for (const one of bare) {
        const said = qualifiedBy(naming, one)
        if (typeof said !== "string") {
          return `\`${path}\` states \`${under}\`, and ${said.refused}`
        }
        spelled.set(one, said)
      }
      found.push({ path, spelled })
    }
  }
  return found
}

export function literalsAt(source: ts.SourceFile, key: string): readonly ts.StringLiteral[] {
  const one = statedIn(source).get(key)
  if (one !== undefined) return [one]
  const list = listIn(source, key)
  return list === null ? [] : list.elements.filter((each) => ts.isStringLiteral(each))
}

export function fieldLiteralsIn(
  entry: ts.ObjectLiteralExpression,
  field: string
): readonly ts.StringLiteral[] {
  for (const one of entry.properties) {
    if (!ts.isPropertyAssignment(one) || keyOf(one) !== field) continue
    if (ts.isStringLiteral(one.initializer)) return [one.initializer]
    if (!ts.isArrayLiteralExpression(one.initializer)) return []
    return one.initializer.elements.filter((each) => ts.isStringLiteral(each))
  }
  return []
}

export function literalsIn(source: ts.SourceFile, given: Asked): readonly ts.StringLiteral[] {
  const field = given.field ?? null
  if (field === null) return literalsAt(source, given.key)
  return valuesIn(source, given.key).flatMap((entry) => fieldLiteralsIn(entry, field))
}

export function editsFor(world: World, given: Asked, one: Carried): readonly FileChange[] | string {
  const text = world.textOf(one.path)
  if (text === null) return `\`${one.path}\` could not be read`
  const source = parsedAs(one.path, text)
  const spots: Splice[] = []
  for (const held of literalsIn(source, given)) {
    const now = one.spelled.get(held.text)
    if (now === undefined) continue
    spots.push({ from: held.getStart(source), to: held.getEnd(), put: JSON.stringify(now) })
  }
  if (spots.length === 0) return `\`${one.path}\` states no bare name under \`${underIn(given)}\``
  return splicedIn(one.path, text, spots)
}

export function qualifyRelationOnEveryPage(world: World, given: Asked): Said {
  const naming = namingFor(world, given)
  if (typeof naming === "string") return refusing(naming)
  const held = spelledOver(world, naming, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) {
    return refusing(
      `no \`${given.pageType}\` names a page by a bare name under \`${underIn(given)}\``
    )
  }
  const edits: FileChange[] = []
  for (const one of held) {
    const made = editsFor(world, given, one)
    if (typeof made === "string") return refusing(made)
    edits.push(...made)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return qualifyRelationOnEveryPage(world, given)
}
