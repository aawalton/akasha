import type { Adding } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { importedFrom, saidAs } from "akasha/page/modules/body/page-body.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { slugsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { bodyOf, schemaAt } from "akasha/page/type/modules/type-schema/type-schema.module.code.ts"
import { turnedBy } from "akasha/page/type/modules/type-turning/type-turning.module.code.ts"
import {
  shapedIn,
  bodyOf as shapesBodyOf,
  shapesFiledAt,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const PAGE_TYPE = "page-type"

const SECTION = "types"

const HOLDS = "ts"

const SCHEMA = "schema"

const SHAPES = "shapes"

const LINES = "jsonl"

const SLUG = "slug"

const ABOVE = "extends"

const PROPERTIES = "properties"

const PROPERTY_AT = "pageProperty"

const REQUIRED = "required"

const SECRET = "secret"

const FIXED = "fixed"

const SHADOWING = new Set([
  "Array",
  "Boolean",
  "Date",
  "Error",
  "Function",
  "JSON",
  "Map",
  "Math",
  "Number",
  "Object",
  "Promise",
  "Proxy",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "WeakMap",
  "WeakSet",
])

export type Taken = {
  readonly typeName: string
  readonly at: string
}

export type Key = Taken & {
  readonly key: string
  readonly optional: boolean
}

type Known = {
  readonly shaped: ReadonlyMap<string, Shape>
  readonly bare: ReadonlyMap<string, Shape | null>
}

function typesAtOf(pageTypePath: string): string | null {
  return besideAt(pageTypePath, SECTION, HOLDS)
}

function narrowedIn(shaped: ReadonlyMap<string, Shape>): ReadonlyMap<string, Shape | null> {
  const found = new Map<string, Shape | null>()
  for (const filed of shaped.values()) {
    found.set(filed.slug, found.has(filed.slug) ? null : filed)
  }
  return found
}

export function resolvingIn(shadow: Shadow): (named: string) => Shape | null {
  let held: Known | null = null
  const known = (): Known => {
    if (held === null) {
      const shaped = shadow.index.shapesAt()
      held = { shaped, bare: narrowedIn(shaped) }
    }
    return held
  }
  return (named) => {
    const found = known()
    return found.shaped.get(named) ?? found.bare.get(named) ?? null
  }
}

function parentsFor(shadow: Shadow, value: Record<string, unknown>): readonly Taken[] {
  const found: Taken[] = []
  for (const slug of slugsIn(value[ABOVE])) {
    const listed = shadow.index.listedAt(PAGE_TYPE, slug)[0]
    if (listed === undefined) continue
    const stated = shadow.pageOf(listed.path)
    const beside = stated?.[SECTION] === HOLDS ? typesAtOf(listed.path) : null
    found.push({ typeName: typedAs(slug), at: beside ?? listed.path })
  }
  return found
}

export function keysFor(
  shadow: Shadow,
  value: Record<string, unknown>,
  resolving: (named: string) => Shape | null
): readonly Key[] {
  const declared = value[PROPERTIES]
  if (!Array.isArray(declared)) return []
  const found: Key[] = []
  for (const one of declared) {
    const stated = one as Record<string, unknown>
    const named = stated[PROPERTY_AT]
    if (typeof named !== "string") continue
    const filed = resolving(named)
    if (filed === null) continue
    const listed = shadow.index.listedAt(filed.pageTypeSlug, filed.slug)[0]
    if (listed === undefined) continue
    const held = shadow.pageOf(listed.path)
    const beside = held?.[SECTION] === HOLDS ? typesAtOf(listed.path) : null
    found.push({
      key: exportedAs(filed.propertySlug),
      typeName: typedAs(filed.slug),
      at: beside ?? listed.path,
      optional: stated[REQUIRED] !== true || stated[SECRET] === true || stated[FIXED] !== undefined,
    })
  }
  return found
}

function calledIn(slug: string, typeName: string): string {
  return SHADOWING.has(typeName) ? `${typedAs(slug)}${typeName}` : typeName
}

function importedAs(slug: string, typeName: string): string {
  const called = calledIn(slug, typeName)
  return called === typeName ? typeName : `${typeName} as ${called}`
}

function importsOf(slug: string, taken: readonly Taken[]): readonly string[] {
  const names = new Map<string, string[]>()
  for (const one of taken) {
    const spec = importedFrom(one.at)
    const said = importedAs(slug, one.typeName)
    const held = names.get(spec)
    if (held === undefined) names.set(spec, [said])
    else if (!held.includes(said)) held.push(said)
  }
  return [...names]
    .sort((one, two) => (one[0] < two[0] ? -1 : one[0] > two[0] ? 1 : 0))
    .map(([spec, held]) => `import type { ${held.sort().join(", ")} } from ${saidAs(spec)}`)
}

function bodyFor(slug: string, parents: readonly Taken[], keys: readonly Key[]): string {
  const imports = importsOf(slug, [...parents, ...keys])
  const head = [...parents.map((one) => calledIn(slug, one.typeName)), "{"].join(" & ")
  const lines = [
    ...imports,
    ...(imports.length === 0 ? [] : [""]),
    `export type ${typedAs(slug)} = ${head}`,
    ...keys.map((one) => `  ${one.key}${one.optional ? "?" : ""}: ${calledIn(slug, one.typeName)}`),
    "}",
  ]
  return `${lines.join("\n")}\n`
}

export function couldTurn(change: Change): boolean {
  return turnedBy(change)
}

function typedInto(
  written: Adding[],
  shadow: Shadow,
  path: string,
  value: Record<string, unknown>,
  slug: string,
  resolving: (named: string) => Shape | null
): undefined {
  if (value[SECTION] !== HOLDS) return
  const at = typesAtOf(path)
  if (at === null) return
  const parents = parentsFor(shadow, value)
  const keys = keysFor(shadow, value, resolving)
  written.push({ kind: "add", path: at, content: bodyFor(slug, parents, keys) })
}

function schemaInto(
  written: Adding[],
  shadow: Shadow,
  path: string,
  value: Record<string, unknown>,
  slug: string
): undefined {
  if (value[SCHEMA] !== LINES) return
  const at = schemaAt(path)
  if (at === null) return
  const carried = shadow.index.propertiesIfNamed(slug) ?? []
  written.push({ kind: "add", path: at, content: bodyOf(carried, shadow.index.shapesAt()) })
}

function shapesInto(
  written: Adding[],
  shadow: Shadow,
  path: string,
  value: Record<string, unknown>,
  slug: string
): undefined {
  if (value[SHAPES] !== LINES) return
  const at = shapesFiledAt(path)
  if (at === null) return
  const found: Shape[] = []
  for (const listed of shadow.index.everyOfType(slug)) {
    const held = shadow.pageOf(listed.path)
    if (held === null) continue
    const one = shapedIn(held)
    if (one !== null) found.push(one)
  }
  written.push({ kind: "add", path: at, content: shapesBodyOf(found) })
}

export function generateTypes(_root: string, shadow: Shadow): readonly Adding[] {
  const written: Adding[] = []
  const resolving = resolvingIn(shadow)
  for (const listed of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    typedInto(written, shadow, listed.path, value, slug, resolving)
    schemaInto(written, shadow, listed.path, value, slug)
    shapesInto(written, shadow, listed.path, value, slug)
  }
  return written
}
