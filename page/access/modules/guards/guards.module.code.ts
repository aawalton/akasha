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
