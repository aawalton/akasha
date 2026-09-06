import { formattedBody } from "@akasha/code-system/code-format"
import type { Schema } from "@akasha/indexes"
import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import type { Shadow } from "@akasha/pages/shadow"
import { shadowFor } from "@akasha/pages/shadow"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { baseOf, changeOf } from "../landing/landing.module.code.ts"

const PAGE_TYPE = "page-type"

const COMPUTED = "computed-property"

const WORKED = "Worked"

const PROPERTIES = "properties"

const SLUG = "slug"

const WORKED_AT = "worked"

const HOLDS = "ts"

const HELD = ".ts"

const SECTION = ".worked.ts"

export type Key = {
  readonly key: string
  readonly typeName: string
  readonly at: string
  readonly overrides: boolean
}

export type Worked = {
  readonly edits: readonly FileEdit[]
  readonly said: readonly string[]
}

const NOTHING_WORKED: Worked = { edits: [], said: [] }

export function workedAtOf(pageTypePath: string): string {
  return `${pageTypePath.slice(0, -HELD.length)}${SECTION}`
}

function specifierFor(from: string, to: string): string {
  const folder = from.slice(0, from.lastIndexOf("/") + 1)
  return to.startsWith(folder) ? `./${to.slice(folder.length)}` : `./${to}`
}

// A stored property is re-typed on the worked page only where that property's own file
// declares the worked form, which is what makes `Omit` necessary. It is read per property
// rather than per page type, so a second entry shape carrying rows needs no code here.
function declaresWorked(text: string, typeName: string): boolean {
  return new RegExp(`export type ${WORKED}${typeName}\\b`).test(text)
}

// The schema is filed under `<page type>/<slug>`, and a page type names a property either way,
// so a bare slug is taken only where one page property carries it.
function narrowedIn(schema: ReadonlyMap<string, Schema>): ReadonlyMap<string, Schema | null> {
  const found = new Map<string, Schema | null>()
  for (const filed of schema.values()) {
    if (filed.slug === null) continue
    found.set(filed.slug, found.has(filed.slug) ? null : filed)
  }
  return found
}

export function keysFor(shadow: Shadow, value: Record<string, unknown>): readonly Key[] {
  const declared = value[PROPERTIES]
  if (!Array.isArray(declared)) return []
  const schema = shadow.index.schemaAt()
  const bareIn = narrowedIn(schema)
  const found: Key[] = []
  for (const one of declared) {
    const named = (one as Record<string, unknown>).pagePropertySlug
    if (typeof named !== "string") continue
    const filed = schema.get(named) ?? bareIn.get(named) ?? undefined
    if (filed === undefined || filed === null) continue
    const { pageTypeSlug, slug, propertySlug } = filed
    if (slug === null || propertySlug === null) continue
    const listed = shadow.index.listedAt(pageTypeSlug, slug)[0]
    if (listed === undefined) continue
    const typeName = typedAs(slug)
    const key = exportedAs(propertySlug)
    if (pageTypeSlug === COMPUTED) {
      found.push({ key, typeName, at: listed.path, overrides: false })
      continue
    }
    const text = shadow.codeAt(listed.path)
    if (text === null || !declaresWorked(text, typeName)) continue
    found.push({ key, typeName: `${WORKED}${typeName}`, at: listed.path, overrides: true })
  }
  return found
}

// The keys come out in the order the page type declares its properties, which is the order
// the page itself states rather than one this chooses.
export function bodyFor(pageTypePath: string, slug: string, keys: readonly Key[]): string {
  const at = workedAtOf(pageTypePath)
  const stored = typedAs(slug)
  const imports = [
    { spec: specifierFor(at, pageTypePath), name: stored },
    ...keys.map((one) => ({ spec: specifierFor(at, one.at), name: one.typeName })),
  ].sort((one, two) => (one.spec < two.spec ? -1 : one.spec > two.spec ? 1 : 0))
  const omitted = keys.filter((one) => one.overrides).map((one) => `"${one.key}"`)
  const head = omitted.length === 0 ? stored : `Omit<${stored}, ${omitted.join(" | ")}>`
  const lines = [
    ...imports.map((one) => `import type { ${one.name} } from "${one.spec}"`),
    "",
    `export type ${WORKED}${stored} = ${head} & {`,
    ...keys.map((one) => `  ${one.key}?: ${one.typeName}`),
    "}",
  ]
  return `${lines.join("\n")}\n`
}

export function workedOver(root: string, shadow: Shadow): Worked {
  const edits: FileEdit[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    // A page type opts in by stating the property that holds the file, so a type carrying
    // calculations and claiming no file is left alone rather than given an unclaimed one.
    if (value[WORKED_AT] !== HOLDS) continue
    const keys = keysFor(shadow, value as Record<string, unknown>)
    if (keys.length === 0) continue
    const at = workedAtOf(listed.path)
    const raw = new TextEncoder().encode(bodyFor(listed.path, slug, keys))
    const body = formattedBody(root, at, raw).body
    const was = shadow.codeAt(at)
    if (was !== null && was === new TextDecoder().decode(body)) continue
    edits.push({ path: at, body })
    said.push(`\`${at}\` was written again from the ${keys.length} keys \`${slug}\` declares`)
  }
  return edits.length === 0 ? NOTHING_WORKED : { edits, said }
}

export function workedFor(root: string, changes: readonly FileEdit[]): Worked {
  try {
    const change = changeOf(root, { base: baseOf(root), edits: changes })
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_WORKED
    return workedOver(root, cast.shadow)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no worked type was written again — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
