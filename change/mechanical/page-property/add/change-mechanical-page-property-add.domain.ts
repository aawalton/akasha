import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPagePropertyAdd = {
  id: "01a09ff4-b22c-750b-a3e1-2b12c19e2101",
  type: "domain",
  slug: "change-mechanical-page-property-add",
  definition: "a mechanical change making a page property with every declaration and key it takes",
  parts: ["change-mechanical/add-page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for the property's own page and for every page gaining it.",
    },
    {
      invariantKind: "departure",
      statement: "A rung here answers for every declaration of the property as well.",
    },
  ],
} as const satisfies Domain
