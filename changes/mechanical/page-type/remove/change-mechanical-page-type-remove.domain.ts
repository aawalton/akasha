import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeRemove = {
  id: "01a09c5f-90a2-75a0-9805-10fef574cff4",
  type: "domain",
  slug: "change-mechanical-page-type-remove",
  definition: "a mechanical change taking a key off every page of one page type",
  parts: ["change-mechanical-page-type/remove-property-from-every-page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here takes a page away.",
    },
  ],
} as const satisfies Domain
