import type { PageQuery } from "../page-query.page-type.ts"

export const netWorthHistory = {
  id: "01a063f9-220b-7e8b-8748-0a43c80b76f1",
  pageTypeSlug: "page-query",
  slug: "net-worth-history",
  asksOfSlug: "temper-net-worth-snapshot",
  parameters: [
    { name: "userId", type: "text" },
    { name: "since", type: "number" },
  ],
  narrows: [
    { key: "userId", comparison: "is", values: ["$userId"] },
    { key: "dataTimestamp", comparison: "at-or-after", values: ["$since"] },
  ],
  keys: ["id", "userId", "dataTimestamp", "totalValue", "excludedGuildBankValue"],
  sortBy: "dataTimestamp",
} as const satisfies PageQuery
