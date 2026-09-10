import type { Domain } from "../domains/domain.page-type.types.ts"

export const change = {
  id: "01a08173-9ce6-7b9e-9368-d7b307f3c674",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change",
  definition: "how a change to the repository is worked out and reached by name",
  parts: ["page-type/change"],
} as const satisfies Domain
