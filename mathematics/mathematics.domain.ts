import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const mathematics = {
  id: "01a06576-0000-7000-8000-000000000102",
  pageTypeSlug: "domain",
  slug: "mathematics",
  definition: "the formal system Alan is building and what stands in it",
  partSlugs: ["page-type/proposition", "page-type/proof"],
} as const satisfies Domain
