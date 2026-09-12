import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeMove = {
  id: "01a095d0-387a-71fc-ae4e-21406f46f2ec",
  type: "domain",
  slug: "change-mechanical-page-type-move",
  definition:
    "a mechanical change carrying what the pages of one page type hold into another place",
  parts: ["change-mechanical-page-type/sort-property-values-on-every-page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here moves a file.",
    },
  ],
} as const satisfies Domain
