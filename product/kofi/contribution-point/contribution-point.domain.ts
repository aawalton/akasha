import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const contributionPoint = {
  id: "01a0b78c-6b30-788a-85a1-935f3a46a786",
  type: "page-type/domain",
  slug: "contribution-point",
  definition:
    "the weight a contribution earns, committed to a feature request and spent when Alan builds it",
} as const satisfies Domain
