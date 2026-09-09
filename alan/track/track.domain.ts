import type { Domain } from "../../domains/domain.page-type.ts"

export const track = {
  id: "01a062dc-1b7f-7bbe-a348-b71f1bbf4c9c",
  pageTypeSlug: "domain",
  slug: "track",
  definition: "what is measured about Alan",
  parts: [
    "domain/tracking-capture",
    "domain/track-daily",
    "page-type/food-entry",
    "page-type/location-trace",
    "page-type/session-activity",
    "module/track-landing",
    "page-type/to-do",
    "page-type/tracking-capture",
    "page-type/tracking-entry",
    "page-type/tracking-entry-date",
    "page-type/tracking-entry-instant",
    "page-type/tracking-entry-session",
    "page-type/tracking-field",
  ],
} as const satisfies Domain
