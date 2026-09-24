import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const constitution = {
  id: "01a06841-a158-76c3-9089-9842c06dc7c0",
  type: "page-type/attribute",
  slug: "constitution",
  definition: "what Alan has built by eating whole plants",
  pointUnit: "100 grams of whole plants eaten",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hundred grams of whole plants eaten is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points are the plant grams of the day's food entries turned into points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grams given as text are read as the number that text spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A food entry whose grams spell no number adds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window the entries are counted over is handed in rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a figure the tracking day has.",
    },
  ],
} as const satisfies Attribute
