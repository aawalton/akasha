import type { Adding } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { exportedAs, typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Schema } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { keysFor, resolvingIn } from "akasha/pages/types/page-type.page-type.type-generator.ts"

const PAGE_PROPERTY = "page-property"

const SECTION = "types"

const HOLDS = "ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

const PROPERTIES = "properties"

const PROPERTY_AT = "pageProperty"

const MANY = "many"

const NULLABLE = "nullable"

const LIST_AT = "akasha/pages/types/page-properties/page-property.page-type.ts"

const RELATION = "relation-property"

const RECORD = "record-property"

const SLUG_AT = "text-property/slug"

const CHOSEN = new Set(["rank-property", "select-property"])

const COMPUTED = "computed-property"

const ONE_OF = "one-of-property"

const MEMBERS = "members"

const PACKAGE = "akasha/"

const HOLDS_AT = "holds"

const VALUES = "values"

const WORKED = new Map<string, string>([
  ["boolean", "boolean"],
  ["date", "string"],
  ["instant", "string"],
  ["number", "number"],
  ["text", "string"],
])

const HELD = new Map<string, string>([
  ["boolean-property", "boolean"],
  ["build-folder-property", "true"],
  ["calendar-date-property", "string"],
  ["calendar-time-property", "string"],
  ["email-address-property", "string"],
  ["instant-property", "string"],
  ["number-property", "number"],
  ["page-property-entry", '"jsonl"'],
  ["phone-number-property", "string"],
  ["process-property", "string"],
  ["standard-agent-english-property", "string"],
  ["text-property", "string"],
  ["url-property", "string"],
])

export function typesAtOf(path: string): string | null {
  return besideAt(path, SECTION, HOLDS)
}

export type Written = {
  readonly held: string
  readonly imports: readonly string[]
}

function declaringMany(shadow: Shadow, kind: string, found: Set<string>): undefined {
  for (const listed of shadow.index.everyOfType(kind)) {
    const declared = shadow.pageOf(listed.path)?.[PROPERTIES]
    if (!Array.isArray(declared)) continue
    for (const one of declared) {
      const stated = one as Record<string, unknown>
      const named = stated[PROPERTY_AT]
      if (typeof named === "string" && stated[MANY] === true) found.add(named)
    }
  }
}

export function manyIn(shadow: Shadow): ReadonlySet<string> {
  const found = new Set<string>()
  declaringMany(shadow, PAGE_TYPE, found)
  for (const kind of shadow.index.kindsUnder(PAGE_PROPERTY)) declaringMany(shadow, kind, found)
  return found
}

function chosenIn(path: string, slug: string): Written {
  const named = exportedAs(slug)
  return {
    held: `(typeof ${named}.values)[number]`,
    imports: [`import type { ${named} } from "${PACKAGE}${path}"`],
  }
}

function memberIn(shadow: Shadow, named: string): Written | null {
  const cut = named.indexOf("/")
  if (cut < 0) return null
  const listed = shadow.index.listedAt(named.slice(0, cut), named.slice(cut + 1))[0]
  if (listed === undefined) return null
  const value = shadow.pageOf(listed.path)
  const slug = value?.[SLUG]
  if (typeof slug !== "string") return null
  const at = value?.[SECTION] === HOLDS ? typesAtOf(listed.path) : listed.path
  if (at === null) return null
  const typed = typedAs(slug)
  return { held: typed, imports: [`import type { ${typed} } from "${PACKAGE}${at}"`] }
}

function oneOfIn(shadow: Shadow, value: Record<string, unknown>): Written | null {
  const named = value[MEMBERS]
  if (!Array.isArray(named) || named.length === 0) return null
  const held: string[] = []
  const imports: string[] = []
  for (const one of named) {
    const member = typeof one === "string" ? memberIn(shadow, one) : null
    if (member === null) return null
    held.push(member.held)
    imports.push(...member.imports)
  }
  return { held: held.join(" | "), imports }
}

export type Asked = {
  readonly at: string
  readonly kind: string
  readonly path: string
  readonly resolving: (named: string) => Schema | null
  readonly slug: string
  readonly value: Record<string, unknown>
}

function recordIn(shadow: Shadow, asked: Asked): Written | null {
  const keys = keysFor(shadow, asked.value, asked.resolving)
  if (keys.length === 0) return null
  const imports: string[] = []
  for (const one of keys) {
    if (one.at === asked.at) continue
    const said = `import type { ${one.typeName} } from "${PACKAGE}${one.at}"`
    if (!imports.includes(said)) imports.push(said)
  }
  const lines = keys.map((one) => `  ${one.key}${one.optional ? "?" : ""}: ${one.typeName}`)
  return { held: `{\n${lines.join("\n")}\n}`, imports }
}

export function writtenFor(shadow: Shadow, asked: Asked): Written | null {
  const held = HELD.get(asked.kind)
  if (held !== undefined) return { held, imports: [] }
  if (asked.kind === RELATION) return memberIn(shadow, SLUG_AT)
  if (asked.kind === RECORD) return recordIn(shadow, asked)
  if (CHOSEN.has(asked.kind)) return chosenIn(asked.path, asked.slug)
  if (asked.kind === ONE_OF) return oneOfIn(shadow, asked.value)
  if (asked.kind !== COMPUTED) return null
  if (Array.isArray(asked.value[VALUES])) return chosenIn(asked.path, asked.slug)
  const worked = WORKED.get(String(asked.value[HOLDS_AT]))
  return worked === undefined ? null : { held: worked, imports: [] }
}

function importedAt(line: string): string {
  return line.slice(line.indexOf('"') + 1, line.lastIndexOf('"'))
}

function importedBefore(one: string, two: string): number {
  return importedAt(one) < importedAt(two) ? -1 : 1
}

export function bodyFor(slug: string, written: Written, many: boolean, nothing: boolean): string {
  const imports = (
    many ? [`import type { List } from "${LIST_AT}"`, ...written.imports] : [...written.imports]
  ).sort(importedBefore)
  const listed = many ? `List<${written.held}>` : written.held
  const said = nothing ? `${listed} | null` : listed
  const lines = [...imports, ...(imports.length === 0 ? [] : [""])]
  return `${[...lines, `export type ${typedAs(slug)} = ${said}`].join("\n")}\n`
}

export function generateTypes(_root: string, shadow: Shadow): readonly Adding[] {
  const written: Adding[] = []
  const many = manyIn(shadow)
  const resolving = resolvingIn(shadow)
  for (const kind of shadow.index.kindsUnder(PAGE_PROPERTY)) {
    for (const listed of shadow.index.everyOfType(kind)) {
      const value = shadow.pageOf(listed.path)
      if (value === null || value[SECTION] !== HOLDS) continue
      const slug = value[SLUG]
      if (typeof slug !== "string") continue
      const at = typesAtOf(listed.path)
      if (at === null) continue
      const held = writtenFor(shadow, { at, kind, path: listed.path, resolving, slug, value })
      if (held === null) continue
      written.push({
        kind: "add",
        path: at,
        content: bodyFor(slug, held, many.has(`${kind}/${slug}`), value[NULLABLE] === true),
      })
    }
  }
  return written
}
