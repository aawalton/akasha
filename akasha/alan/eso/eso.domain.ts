import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const eso = {
  id: "01a0675b-16ea-77df-9153-bac46e026794",
  pageTypeSlug: "domain",
  slug: "eso",
  definition: "Alan's play of The Elder Scrolls Online",
  invariants: [
    {
      invariantKind: "gap",
      statement: "A persona answers for this domain.",
    },
  ],
} as const satisfies Domain
