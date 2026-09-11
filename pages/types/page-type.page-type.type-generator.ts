import type { Adding } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { importedFrom } from "akasha/pages/body/page-body.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { exportedAs, typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shape } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { turnedBy } from "akasha/pages/types/type-turning/type-turning.module.code.ts"
import { slugsIn } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const SECTION = "types"

const HOLDS = "ts"

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

export function typesAtOf(pageTypePath: string): string | null {
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

export function parentsFor(shadow: Shadow, value: Record<string, unknown>): readonly Taken[] {
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
    .map(([spec, held]) => `import type { ${held.sort().join(", ")} } from "${spec}"`)
}

export function bodyFor(slug: string, parents: readonly Taken[], keys: readonly Key[]): string {
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

export function generateTypes(_root: string, shadow: Shadow): readonly Adding[] {
  const written: Adding[] = []
  const resolving = resolvingIn(shadow)
  for (const listed of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || value[SECTION] !== HOLDS) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    const at = typesAtOf(listed.path)
    if (at === null) continue
    const parents = parentsFor(shadow, value)
    const keys = keysFor(shadow, value, resolving)
    written.push({
      kind: "add",
      path: at,
      content: bodyFor(slug, parents, keys),
    })
  }
  return written
}
