import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const strength = {
  id: "01a06841-a1b4-731f-8d52-fe93c3564922",
  type: "page-type/attribute",
  slug: "strength",
  definition: "what Alan has built by lifting weight",
  pointUnit: "1000 kilograms lifted",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thousand kilograms moved is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thousand kilograms is 2204.62 pounds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points are the pounds the tracking day carries turned into points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no pounds earns nothing rather than a strength of zero.",
    },
  ],
  createdAt: "2026-09-03T17:12:06.836Z",
  updatedAt: "2026-10-18T13:43:32.840Z",
} as const satisfies Attribute
