import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextSevenDayBack = {
  id: "01a063f9-220d-7b38-ac6f-efaacd77920c",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-seven-day-back",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "sevenDayPercentUsed", comparison: "at-or-after", values: ["100"] },
    { key: "sevenDayResetsAt", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["sevenDayResetsAt"],
  sortBy: "sevenDayResetsAt",
  limit: 1,
} as const satisfies PageQuery
