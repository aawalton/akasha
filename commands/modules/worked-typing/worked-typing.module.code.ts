import { join } from "node:path"
import { textOf } from "@akasha/code/body-text"
import { formattedBody } from "@akasha/code/code-format"
import type { Schema } from "@akasha/indexes/shape"
import type { Change } from "@akasha/pages/change"
import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import { shadowFor } from "@akasha/pages/shadow"
import { textOnDisk } from "@akasha/utils/fs/text-on-disk"
import type {
  Adding,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"

const PAGE_TYPE = "page-type"

const COMPUTED = "computed-property"

const WORKED = "Worked"

const PROPERTIES = "properties"

const SLUG = "slug"

const WORKED_AT = "worked"

const TYPES_AT = "types"

const HOLDS = "ts"

const PROPERTY_AT = "propertySlug"

const HELD = ".ts"

const SECTION = ".worked.ts"

export type Key = {
  readonly key: string
  readonly typeName: string
  readonly at: string
  readonly overrides: boolean
}

export type Worked = {
  readonly edits: readonly (Adding | Replacing)[]
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

function declaresWorked(text: string, typeName: string): boolean {
  return new RegExp(`export type ${WORKED}${typeName}\\b`).test(text)
}

export function textIn(
  change: Change,
  codeAt: (path: string) => string | null
): (path: string) => string | null {
  return (path) => {
    const at = codeAt(path)
    return at === null ? null : textOf(change.after(at))
  }
}

function narrowedIn(schema: ReadonlyMap<string, Schema>): ReadonlyMap<string, Schema | null> {
  const found = new Map<string, Schema | null>()
  for (const filed of schema.values()) {
    found.set(filed.slug, found.has(filed.slug) ? null : filed)
  }
  return found
}

export function keysFor(
  shadow: Shadow,
  value: Record<string, unknown>,
  textAt: (path: string) => string | null
): readonly Key[] {
  const declared = value[PROPERTIES]
  if (!Array.isArray(declared)) return []
  const schema = shadow.index.schemaAt()
  const bareIn = narrowedIn(schema)
  const found: Key[] = []
  for (const one of declared) {
    const stated = one as Record<string, unknown>
    const named = stated["pageProperty"] ?? stated["pagePropertySlug"]
    if (typeof named !== "string") continue
    const filed = schema.get(named) ?? bareIn.get(named) ?? undefined
    if (filed === undefined || filed === null) continue
    const { pageTypeSlug, slug, propertySlug } = filed
    const listed = shadow.index.listedAt(pageTypeSlug, slug)[0]
    if (listed === undefined) continue
    const typeName = typedAs(slug)
    const key = exportedAs(propertySlug)
    if (pageTypeSlug === COMPUTED) {
      found.push({ key, typeName, at: listed.path, overrides: false })
      continue
    }
    const text = textAt(listed.path)
    if (text === null || !declaresWorked(text, typeName)) continue
    found.push({ key, typeName: `${WORKED}${typeName}`, at: listed.path, overrides: true })
  }
  return found
}

export function storedAtOf(pageTypePath: string, value: Record<string, unknown>): string {
  if (value[TYPES_AT] !== HOLDS) return pageTypePath
  return besideAt(pageTypePath, TYPES_AT, HOLDS) ?? pageTypePath
}

export function bodyFor(
  pageTypePath: string,
  storedAt: string,
  slug: string,
  keys: readonly Key[]
): string {
  const at = workedAtOf(pageTypePath)
  const stored = typedAs(slug)
  const imports = [
    { spec: specifierFor(at, storedAt), name: stored },
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

export function workedOver(change: Change, shadow: Shadow): Worked {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  const textAt = textIn(change, shadow.codeAt)
  for (const listed of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    if (value[WORKED_AT] !== HOLDS) continue
    const keys = keysFor(shadow, value as Record<string, unknown>, textAt)
    if (keys.length === 0) continue
    const at = workedAtOf(listed.path)
    const storedAt = storedAtOf(listed.path, value as Record<string, unknown>)
    const raw = new TextEncoder().encode(bodyFor(listed.path, storedAt, slug, keys))
    const now = new TextDecoder().decode(formattedBody(change.root, at, raw).body)
    const was = textOf(change.after(at))
    if (was === now) continue
    edits.push(
      was === null
        ? { kind: "add", path: at, content: now }
        : { kind: "replace", path: at, contentFrom: was, contentTo: now }
    )
    said.push(`\`${at}\` was written again from the ${keys.length} keys \`${slug}\` declares`)
  }
  return edits.length === 0 ? NOTHING_WORKED : { edits, said }
}

function statesProperty(text: string | null): boolean {
  return text?.includes(PROPERTY_AT) === true
}

function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.held !== HOLDS) continue
    if (said.sections.includes(WORKED_AT)) return true
    if (said.sections.length > 0) continue
    if (said.pageType === PAGE_TYPE) return true
    if (statesProperty(textOnDisk(join(change.root, path)))) return true
    if (statesProperty(textOf(change.after(path)))) return true
  }
  return false
}

export function workedFor(change: Change): Worked {
  try {
    if (!couldTurn(change)) return NOTHING_WORKED
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_WORKED
    return workedOver(change, cast.shadow)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no worked type was written again — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
