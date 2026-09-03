import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const relating = {
  id: "01a0658f-90a6-7faf-883a-b68b1891fd70",
  pageTypeSlug: "domain",
  slug: "relating",
  definition: "the people in Alan's life and what he keeps of them",
  partSlugs: [
    "page-type/connection-activity",
    "page-type/relationship",
    "page-type/relationship-deposit",
    "page-type/relationship-topic",
  ],
} as const satisfies Domain
