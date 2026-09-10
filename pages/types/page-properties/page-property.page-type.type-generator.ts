import { basename } from "node:path"
import type { Adding } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { exportedAs, typedAs } from "../../export-name/page-export-name.module.code.ts"
import { besideAt } from "../../file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../shadow/shadow.module.code.ts"

const PAGE_PROPERTY = "page-property"

const SECTION = "types"

const HOLDS = "ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

const PROPERTIES = "properties"

const PROPERTY_AT = "pageProperty"

const MANY = "many"

const LIST_AT = "akasha/pages/types/page-properties/page-property.page-type.ts"

const CHOSEN = new Set(["rank-property", "select-property"])

const HELD = new Map<string, string>([
  ["boolean-property", "boolean"],
  ["build-folder-property", "true"],
  ["calendar-date-property", "string"],
  ["calendar-time-property", "string"],
  ["email-address-property", "string"],
  ["instant-property", "string"],
  ["page-property-entry", '"jsonl"'],
  ["phone-number-property", "string"],
  ["process-property", "string"],
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

export function writtenFor(kind: string, path: string, slug: string): Written | null {
  const held = HELD.get(kind)
  if (held !== undefined) return { held, imports: [] }
  if (!CHOSEN.has(kind)) return null
  const named = exportedAs(slug)
  return {
    held: `(typeof ${named}.values)[number]`,
    imports: [`import type { ${named} } from "./${basename(path)}"`],
  }
}

export function bodyFor(slug: string, written: Written, many: boolean): string {
  const imports = many
    ? [`import type { List } from "${LIST_AT}"`, ...written.imports]
    : [...written.imports]
  const said = many ? `List<${written.held}>` : written.held
  const lines = [...imports, ...(imports.length === 0 ? [] : [""])]
  return `${[...lines, `export type ${typedAs(slug)} = ${said}`].join("\n")}\n`
}

export function generateTypes(_root: string, shadow: Shadow): readonly Adding[] {
  const written: Adding[] = []
  const many = manyIn(shadow)
  for (const kind of shadow.index.kindsUnder(PAGE_PROPERTY)) {
    for (const listed of shadow.index.everyOfType(kind)) {
      const value = shadow.pageOf(listed.path)
      if (value === null || value[SECTION] !== HOLDS) continue
      const slug = value[SLUG]
      if (typeof slug !== "string") continue
      const at = typesAtOf(listed.path)
      if (at === null) continue
      const held = writtenFor(kind, listed.path, slug)
      if (held === null) continue
      written.push({
        kind: "add",
        path: at,
        content: bodyFor(slug, held, many.has(`${kind}/${slug}`)),
      })
    }
  }
  return written
}
