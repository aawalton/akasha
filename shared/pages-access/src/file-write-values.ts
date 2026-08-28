import type { Value } from "@shared/pages-query"
import { nameOfPageId, type Translated } from "./file-page-name"
import { namesNothing, type RelationOnType, relationsOn, standsUnder } from "./file-relation"
import { kebabizeKey } from "./file-rows"
import { backings } from "./file-write-backing"
import { FileWriteError } from "./file-write-error"

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

/** Spelled camel, and asked camel — the read seam asks the same question at `file-rows.ts:192`. */
const SETTLED_ELSEWHERE: ReadonlySet<string> = new Set(["pageTypeSlug", "pageTypeId", "userId"])

const PAGE_ID = "id"

export function statedId(values: Readonly<Record<string, Value>>): string | null {
  const held = values[PAGE_ID]
  return typeof held === "string" && held !== "" ? held : null
}

export function fileValuesOf(
  op: string,
  pageTypeSlug: string,
  input: Readonly<Record<string, unknown>>
): Record<string, Value> {
  const out: Record<string, Value> = {}
  for (const [rawKey, value] of Object.entries(input)) {
    if (value === undefined) continue
    // TESTED ON THE RAW KEY, BEFORE KEBABIZING, AND THE ORDER IS LOAD-BEARING. This set is spelled
    // camel because camel is what the row store calls its own columns. So `userId` names the row s
    // user column and is dropped here, while `user-id` names a property the page holds in its own
    // file and is kept. The two spellings do not mean the same thing.
    //
    // Four file-backed page types turn on that difference. `device-secret` and `device-token`
    // declare `key: user-id`, their writers pass it in kebab, their files carry it, and
    // `device-secrets.server.ts:34` reads the page back through it and returns null without it.
    // Asking `camelizeKey(rawKey)` here collapses the two spellings and strips `user-id` from
    // every device write, which fails as an authentication that quietly stops recognising anyone.
    if (SETTLED_ELSEWHERE.has(rawKey)) continue
    const key = kebabizeKey(rawKey)
    out[key] = fileValue(op, pageTypeSlug, key, value)
  }
  return out
}

// WHAT THIS MAY ADVISE IS BOUNDED BY WHICH OUTCOME CAME BACK. `nameOfPageId` separates a corpus
// that was read and holds no page under this id from one that was never looked at, and only the
// first of those licenses telling the writer that what it named is not an id. Collapsing the two —
// which is what reaching this through a `string | null` did — spends a refused read as though it
// were an answer, and tells the writer to rename a value that may well have been right.
function said(relation: RelationOnType, translated: Translated): string {
  if (translated.outcome === "named") {
    return `That is the id of \`${translated.name}\`, and a file-backed relation carries the target's name rather than its id, so write \`${translated.name}\`.`
  }
  // The corpus was read: `absent` holds no page under that id, and `malformed` is not a uuid at
  // all, so under neither can this be the id of a page that stands.
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
      if (await standsUnder(relation.targetSlug, named)) continue
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

export async function valuesToWrite(
  op: string,
  pageTypeSlug: string,
  input: Readonly<Record<string, unknown>>
): Promise<Record<string, Value>> {
  const values = fileValuesOf(op, pageTypeSlug, input)
  await refuseUnresolvedRelations(op, pageTypeSlug, values)
  return values
}
