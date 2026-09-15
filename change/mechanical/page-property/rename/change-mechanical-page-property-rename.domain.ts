import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPagePropertyRename = {
  id: "01a09c4c-f967-7bc1-9f20-eb6d135c13d0",
  type: "domain",
  slug: "change-mechanical-page-property-rename",
  definition: "a mechanical change restating the slug a page property is stated under",
  parts: ["change-mechanical/rename-page-property-property-slug"],
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
