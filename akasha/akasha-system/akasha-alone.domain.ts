import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaAlone = {
  id: "01a04d8e-72a5-7b9f-97fd-749b14b8f473",
  pageTypeSlug: "domain",
  slug: "akasha-alone",
  definition: "the akasha system as the whole repository",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Nothing in the repository is outside the akasha system.",
    },
    {
      invariantKind: "gap",
      statement: "The akasha folder is the repository root.",
    },
  ],
} as const satisfies Domain
