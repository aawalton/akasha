import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextSevenDayEnd = {
  id: "01a063f9-220d-7cb8-b85a-de226f25388c",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-seven-day-end",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "seven-day-percent-used", comparison: "before", values: ["100"] },
    { key: "seven-day-resets-at", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["seven-day-resets-at"],
  sortBy: "seven-day-resets-at",
  limit: 1,
} as const satisfies PageQuery
