import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const luck = {
  id: "01a06841-a19b-775f-8183-8af74871a217",
  type: "page-type/attribute",
  slug: "luck",
  definition: "what Alan has built by inviting rejection",
  pointUnit: "one rejection attempted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One rejection Alan risked is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rejection that came back as a no counts twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points are the rejections written down over the window turned into points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window the rejections are counted over is handed in rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window holding no rejection earns zero rather than nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a figure the tracking day has.",
    },
  ],
} as const satisfies Attribute
