import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const workingColor = {
  id: "01a0d418-de99-707f-a82d-2e055619cb91",
  type: "page-type/computed-property",
  slug: "working-color",
  propertySlug: "working-color",
  definition: "the color a seat's turn state is drawn in",
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
} as const satisfies ComputedProperty
