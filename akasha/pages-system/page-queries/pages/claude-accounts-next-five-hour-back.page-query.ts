import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextFiveHourBack = {
  id: "01a063f9-220d-7388-812e-f6ddf2d2930a",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-five-hour-back",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "five-hour-percent-used", comparison: "at-or-after", values: ["100"] },
    { key: "five-hour-resets-at", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["five-hour-resets-at"],
  sortBy: "five-hour-resets-at",
  limit: 1,
} as const satisfies PageQuery
