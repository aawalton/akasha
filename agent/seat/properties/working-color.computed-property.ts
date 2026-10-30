import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const workingColor = {
  id: "01a0d418-de99-707f-a82d-2e055619cb91",
  type: "page-type/computed-property",
  slug: "working-color",
  propertySlug: "working-color",
  definition: "the color a seat is shown in",
  holds: "relation",
  targetPageType: "page-type/color",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's turn is read by the seat turn reading, as the editor reads it.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The color is the one the turn state's own page names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The editor reads a transcript before it draws, so this color can trail it.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T15:46:34.777Z",
  updatedAt: "2026-10-30T14:37:29.493Z",
} as const satisfies ComputedProperty
