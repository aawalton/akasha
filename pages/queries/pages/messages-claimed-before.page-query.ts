import type { PageQuery } from "../page-query.page-type.ts"

export const messagesClaimedBefore = {
  id: "01a063f9-220b-7f24-9b1b-a26feecbdd57",
  pageTypeSlug: "page-query",
  slug: "messages-claimed-before",
  asksOfSlug: "message",
  parameters: [
    { name: "to", type: "text" },
    { name: "before", type: "instant" },
  ],
  narrows: [
    { key: "to", comparison: "is", values: ["$to"] },
    { key: "claimedAt", comparison: "before", values: ["$before"] },
  ],
  keys: ["to", "from", "warrant", "claimedAt", "body"],
} as const satisfies PageQuery
