import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const tracking = {
  id: "01a062dc-1b7f-7bbe-a348-b71f1bbf4c9c",
  pageTypeSlug: "domain",
  slug: "tracking",
  definition: "what is measured about Alan",
  partSlugs: [
    "domain/tracking-capture",
    "domain/tracking-daily",
    "page-type/food-entry",
    "page-type/location-trace",
    "page-type/session-activity",
    "module/activity-default",
    "page-type/to-do",
    "page-type/tracking-capture",
    "page-type/tracking-entry",
    "page-type/tracking-entry-date",
    "page-type/tracking-entry-instant",
    "page-type/tracking-entry-session",
    "page-type/tracking-field",
  ],
} as const satisfies Domain
