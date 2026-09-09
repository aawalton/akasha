import type { Domain } from "../../../domains/domain.page-type.ts"

export const namedFor = {
  id: "01a05c53-bc6a-7abd-bdd4-f484ded3d33b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "named-for",
  definition: "the name a page is filed under, worked out from a rule and what fills the rule",
  parts: ["module/page-stem", "module/name-rule"],
} as const satisfies Domain
