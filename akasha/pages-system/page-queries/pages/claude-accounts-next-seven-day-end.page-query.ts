import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextSevenDayEnd = {
  id: "01a063f9-220d-7cb8-b85a-de226f25388c",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-seven-day-end",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "sevenDayPercentUsed", comparison: "before", values: ["100"] },
    { key: "sevenDayResetsAt", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["sevenDayResetsAt"],
  sortBy: "sevenDayResetsAt",
  limit: 1,
} as const satisfies PageQuery
