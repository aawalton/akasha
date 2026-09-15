import { isFileBacked } from "akasha/page/access/modules/file-backed-roster/file-backed-roster.module.code.ts"
import { isReadOnlyKey } from "akasha/page/access/modules/universal-keys/universal-keys.module.code.ts"

class PageTypeNotFileBacked extends Error {
  readonly slug: string
  constructor(op: string, slug: string) {
    super(
      `${op}: the roster of file-backed page types answered and does not name "${slug}", so nothing holds its pages and this write has nowhere to land. Give the \`${slug}\` page type a \`files:\` glob, or a \`rows: jsonl\` property on the page type that holds its rows.`
    )
    this.name = "PageTypeNotFileBacked"
    this.slug = slug
  }
}

export async function requireFileBacked(op: string, slug: string): Promise<undefined> {
  if (await isFileBacked(slug)) return
  throw new PageTypeNotFileBacked(op, slug)
}

class ReservedKeyError extends Error {
  readonly kind = "read-only" as const
  readonly key: string
  constructor(op: string, key: string) {
    super(`${op}: key "${key}" is system-managed (read-only) and cannot be written`)
    this.name = "ReservedKeyError"
    this.key = key
  }
}

export function rejectReadOnlyKeys(op: string, properties: Record<string, unknown>): undefined {
  for (const key of Object.keys(properties)) {
    if (isReadOnlyKey(key)) throw new ReservedKeyError(op, key)
  }
}

const TAGS_KEY = "tags"

class WholesaleTagsSetError extends Error {
  readonly kind = "wholesale-tags-set" as const
  constructor(op: string) {
    super(
      `${op}: wholesale set of the "${TAGS_KEY}" attribute is forbidden — a tags-array replace can silently drop a reserved tag (e.g. \`author:*\`, \`*-define-front\`) with no reason trail. Mutate reserved tags via targeted RFC 6902 \`patch\` element ops (add "/tags/-", remove "/tags/<idx>"), which cannot disturb sibling tags.`
    )
    this.name = "WholesaleTagsSetError"
  }
}

export function rejectWholesaleTagsSet(op: string, set: Record<string, unknown>): undefined {
  if (TAGS_KEY in set) throw new WholesaleTagsSetError(op)
}
