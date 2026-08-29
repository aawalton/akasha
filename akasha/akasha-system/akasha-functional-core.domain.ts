import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaFunctionalCore = {
  id: "01a049e9-651d-7004-9075-d53b697b710a",
  pageTypeSlug: "domain",
  slug: "akasha-functional-core",
  definition: "the smallest part of the new system that can run itself",
  intent: [
    {
      invariantKind: "gap",
      statement: "Every change to the akasha system is made by it.",
    },
    {
      invariantKind: "gap",
      statement: "A change the akasha system makes is gated, written and committed as one act.",
    },
    {
      invariantKind: "gap",
      statement: "The akasha system checks every change to itself.",
    },
  ],
} as const satisfies Domain
