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
    "page-type/session-activity",
    "page-type/to-do",
  ],
} as const satisfies Domain
