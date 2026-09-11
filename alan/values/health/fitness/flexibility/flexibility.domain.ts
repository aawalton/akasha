import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const flexibility = {
  id: "01a09111-9cc5-7576-83ef-2d6621b37793",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "flexibility",
  definition: "how far Alan's body moves",
  parts: ["page-type/flexibility-log"],
} as const satisfies Domain
