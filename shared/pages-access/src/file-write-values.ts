import type { Value } from "@shared/pages-query"
import { fileRelationDeclarations } from "./file-property-defs.ts"
import { nameOfPageId, type Translated } from "./file-page-name.ts"
import { namesNothing, type RelationOnType, relationsOn, standsUnder } from "./file-relation.ts"
import { camelizeKey, kebabizeKey } from "./file-rows.ts"
import { backings } from "./file-write-backing.ts"
import { FileWriteError } from "./file-write-error.ts"

function describeValue(value: unknown): string {
  if (Array.isArray(value)) {
    const kinds = [
      ...new Set(
        value.map((one) =>
          one === null ? "null" : Array.isArray(one) ? "a list" : `a ${typeof one}`
        )
      ),
    ].sort()
    return `a list of ${value.length} item(s) holding ${kinds.join(", ")}`
  }
  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value)
    return keys.length === 0
      ? "an object holding no keys"
      : `an object holding ${keys.length} key(s): ${keys.join(", ")}`
  }
  return `a ${typeof value}`
}

function fileValue(op: string, pageTypeSlug: string, key: string, value: unknown): Value {
  if (value === null) return []
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value
  }
  if (Array.isArray(value)) {
    const flat = value.every(
      (one) => typeof one === "string" || typeof one === "number" || typeof one === "boolean"
    )
    if (flat) return value.map((one) => String(one))
  }
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): \`${key}\` holds ${describeValue(value)}, which no frontmatter line can carry. A file page holds a string, a number, a boolean, or a list of those. Declare the property \`attachment: json\` and hand it the value as a document of its own, or hold this page type's pages in a \`rows: jsonl\` sidecar and write them with \`writeRow\`.`
  )
}

const SETTLED_ELSEWHERE: ReadonlySet<string> = new Set(["pageTypeSlug", "pageTypeId", "userId"])

const PAGE_ID = "id"

export function statedId(values: Readonly<Record<string, Value>>): string | null {
  const held = values[PAGE_ID]
  return typeof held === "string" && held !== "" ? held : null
}

export function declaredKeysOf(
  declarations: readonly { readonly key: string }[] | null
): ReadonlyMap<string, string> {
  return new Map((declarations ?? []).map((one) => [camelizeKey(one.key), one.key]))
}

export function fileValuesOf(
  op: string,
  pageTypeSlug: string,
  input: Readonly<Record<string, unknown>>,
  declared: ReadonlyMap<string, string> = new Map()
): Record<string, Value> {
  const out: Record<string, Value> = {}
  for (const [rawKey, value] of Object.entries(input)) {
    if (value === undefined) continue
    if (SETTLED_ELSEWHERE.has(rawKey)) continue
    const key = declared.get(camelizeKey(rawKey)) ?? kebabizeKey(rawKey)
    out[key] = fileValue(op, pageTypeSlug, key, value)
  }
  return out
}

function said(relation: RelationOnType, translated: Translated): string {
  if (translated.outcome === "named") {
    return `That is the id of \`${translated.name}\`, and a file-backed relation carries the target's name rather than its id, so write \`${translated.name}\`.`
  }
  if (translated.outcome === "absent" || translated.outcome === "malformed") {
    return `Name it as its file is named.`
  }
  return `Whether that is instead the id of a \`${relation.targetSlug}\` page went unestablished — ${translated.why} — so nothing here says to name it any differently.`
}

function unresolved(
  op: string,
  pageTypeSlug: string,
  key: string,
  relation: RelationOnType,
  named: string,
  translated: Translated
): string {
  return `${op}(${pageTypeSlug}): \`${key}\` points at a \`${relation.targetSlug}\` page by name, and this write names \`${named}\`, which no \`${relation.targetSlug}\` page stands under. ${said(relation, translated)} Nothing has been written.`
}

function unreadTarget(
  op: string,
  pageTypeSlug: string,
  key: string,
  relation: RelationOnType,
  named: string,
  why: string
): string {
  return `${op}(${pageTypeSlug}): \`${key}\` points at a \`${relation.targetSlug}\` page by name, and this write names \`${named}\`, which went unlooked-for — ${why}. Nothing here says whether that page stands, so this is a read that failed rather than a name that is wrong. Nothing has been written.`
}

function unreadRoster(
  op: string,
  pageTypeSlug: string,
  key: string,
  relation: RelationOnType,
  why: string
): string {
  return `${op}(${pageTypeSlug}): \`${key}\` points at a \`${relation.targetSlug}\` page by name, and the roster of file-backed page types went unread — ${why} — so nothing here can say whether \`${relation.targetSlug}\` is file-backed, let alone whether the page this names stands. Nothing has been written.`
}

async function refuseUnresolvedRelations(
  op: string,
  pageTypeSlug: string,
  values: Readonly<Record<string, Value>>
): Promise<undefined> {
  const relations = await relationsOn(pageTypeSlug)
  if (relations === null) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): what this page type's properties point at went unread, so nothing here can say whether this write names a page that stands. Nothing has been written.`
    )
  }
  for (const [key, held] of Object.entries(values)) {
    const relation = relations.get(key)
    if (relation === undefined || relation.points !== "name") continue
    if (relation.mayBeGone || relation.slugProperty !== null) continue
    const roster = await backings()
    if (roster.unreadBecause !== null) {
      throw new FileWriteError(
        pageTypeSlug,
        unreadRoster(op, pageTypeSlug, key, relation, roster.unreadBecause)
      )
    }
    if (roster.types.get(relation.targetSlug) === undefined) continue
    for (const one of Array.isArray(held) ? held : [held]) {
      if (typeof one !== "string" || namesNothing(one)) continue
      const named = one.trim()
      const standing = await standsUnder(relation.targetSlug, named)
      if (standing.outcome === "stands") continue
      if (standing.outcome === "unasked") {
        throw new FileWriteError(
          pageTypeSlug,
          unreadTarget(op, pageTypeSlug, key, relation, named, standing.why)
        )
      }
      throw new FileWriteError(
        pageTypeSlug,
        unresolved(
          op,
          pageTypeSlug,
          key,
          relation,
          named,
          await nameOfPageId(relation.targetSlug, named)
        )
      )
    }
  }
}

async function refuseSettledDeclared(
  op: string,
  pageTypeSlug: string,
  input: Readonly<Record<string, unknown>>
): Promise<undefined> {
  const carried = Object.keys(input).filter(
    (one) => input[one] !== undefined && SETTLED_ELSEWHERE.has(one)
  )
  if (carried.length === 0) return
  const declared = await fileRelationDeclarations(pageTypeSlug)
  if (declared === null) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): \`${carried.join("`, `")}\` is what the row store calls one of its own columns, and what this page type declares went unread, so nothing here can say whether it is also a property of its own. Nothing has been written.`
    )
  }
  const keys = new Set(declared.map((one) => one.key))
  const collides = carried.filter((one) => keys.has(one))
  if (collides.length === 0) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): \`${collides.join("`, `")}\` is declared as a property of this page type and is also what the row store calls one of its own columns, so a frontmatter line cannot carry it under that spelling and it was being dropped. Declare the property as \`${kebabizeKey(collides[0] as string)}\`, or hold this page type's pages in a \`rows: jsonl\` sidecar and write them with \`writeRow\`. Nothing has been written.`
  )
}

export async function valuesToWrite(
  op: string,
  pageTypeSlug: string,
  input: Readonly<Record<string, unknown>>
): Promise<Record<string, Value>> {
  await refuseSettledDeclared(op, pageTypeSlug, input)
  const declared = declaredKeysOf(await fileRelationDeclarations(pageTypeSlug))
  const values = fileValuesOf(op, pageTypeSlug, input, declared)
  await refuseUnresolvedRelations(op, pageTypeSlug, values)
  return values
}
