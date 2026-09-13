import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeRemove = {
  id: "01a09c5f-90a2-75a0-9805-10fef574cff4",
  type: "domain",
  slug: "change-mechanical-page-type-remove",
  definition: "a mechanical change taking something away from one page type or from its pages",
  parts: [
    "change-mechanical-page-type/remove-property-from-every-page",
    "change-mechanical-page-type/remove-property-from-page-type",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers the whole scope of one act in one answer.",
    },
  ],
} as const satisfies Domain
