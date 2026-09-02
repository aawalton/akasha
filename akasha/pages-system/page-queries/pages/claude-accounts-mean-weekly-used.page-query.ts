import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsMeanWeeklyUsed = {
  id: "01a063f9-220d-70ab-8de0-ff2f52db5e56",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-mean-weekly-used",
  asksOfSlug: "claude-account",
  reduction: "mean",
  targetKey: "effective-seven-day-percent-used",
} as const satisfies PageQuery
