import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageTypeMove = {
  id: "01a095d0-387a-71fc-ae4e-21406f46f2ec",
  type: "page-type/domain",
  slug: "change-mechanical-page-type-move",
  definition: "a mechanical change carrying what the pages of a page type hold into another place",
  parts: [
    "change-mechanical-page-type/move-property-on-every-page",
    "change-mechanical-page-type/sort-property-values-on-every-page",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here moves a file.",
    },
  ],
} as const satisfies Domain
