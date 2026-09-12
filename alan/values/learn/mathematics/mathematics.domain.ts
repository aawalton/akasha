import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const mathematics = {
  id: "01a06576-0000-7000-8000-000000000102",
  type: "domain",
  slug: "mathematics",
  definition: "the formal system Alan is building and what is in it",
  parts: ["page-type/proof", "page-type/proposition"],
} as const satisfies Domain
