import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPagePropertyRemove = {
  id: "01a09c76-3c82-7918-b08a-74e6ed3789a4",
  type: "domain",
  slug: "change-mechanical-page-property-remove",
  definition: "a mechanical change taking a page property away with every page's key for it",
  parts: ["change-mechanical/remove-page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page carrying the property at once.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here answers for the property's own page as well.",
    },
  ],
} as const satisfies Domain
