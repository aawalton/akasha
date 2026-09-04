import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextFiveHourBack = {
  id: "01a063f9-220d-7388-812e-f6ddf2d2930a",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-five-hour-back",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "fiveHourPercentUsed", comparison: "at-or-after", values: ["100"] },
    { key: "fiveHourResetsAt", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["fiveHourResetsAt"],
  sortBy: "fiveHourResetsAt",
  limit: 1,
} as const satisfies PageQuery
