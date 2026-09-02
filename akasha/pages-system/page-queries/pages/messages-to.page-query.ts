import type { PageQuery } from "../page-query.page-type.ts"

export const messagesTo = {
  id: "01a063f9-220b-747c-beda-e839ea2c4720",
  pageTypeSlug: "page-query",
  slug: "messages-to",
  asksOfSlug: "message",
  parameters: [{ name: "to", type: "text" }],
  narrows: [{ key: "to", comparison: "is", values: ["$to"] }],
  keys: ["to", "from", "warrant", "claimed-at", "body"],
} as const satisfies PageQuery
