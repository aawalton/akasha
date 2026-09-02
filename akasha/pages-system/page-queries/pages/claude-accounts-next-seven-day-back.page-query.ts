import type { PageQuery } from "../page-query.page-type.ts"

export const claudeAccountsNextSevenDayBack = {
  id: "01a063f9-220d-7b38-ac6f-efaacd77920c",
  pageTypeSlug: "page-query",
  slug: "claude-accounts-next-seven-day-back",
  asksOfSlug: "claude-account",
  narrows: [
    { key: "seven-day-percent-used", comparison: "at-or-after", values: ["100"] },
    { key: "seven-day-resets-at", comparison: "at-or-after", values: ["now"] },
  ],
  keys: ["seven-day-resets-at"],
  sortBy: "seven-day-resets-at",
  limit: 1,
} as const satisfies PageQuery
