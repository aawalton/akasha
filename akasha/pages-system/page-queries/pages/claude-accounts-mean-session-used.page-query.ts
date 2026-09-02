import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsMeanSessionUsed = {
  id: "01a063f9-220a-74f4-bbe2-36f02066df3b",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-mean-session-used",
  asksOfSlug: "claude-account",
  reduction: "mean",
  targetKey: "effective-five-hour-percent-used",
} as const satisfies PageQuery
