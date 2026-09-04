import type { PageQuery } from "../page-query.page-type.ts"

export const personaAll = {
  id: "01a063f9-220c-793c-9f67-ca3d66d40f3a",
  pageTypeSlug: "page-query",
  slug: "persona-all",
  asksOfSlug: "persona",
  keys: [
    "id",
    "slug",
    "seq",
    "title",
    "cover",
    "value-slug",
    "green-day-points",
    "last-messaged-at",
    "email-address",
    "voice-reference-sha256",
  ],
} as const satisfies PageQuery
