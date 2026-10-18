import type { Attribute } from "akasha/alan/attribute/attribute.page-type.types.ts"

export const endurance = {
  id: "01a06841-a16e-7bcb-a31a-fba64ce8de69",
  type: "page-type/attribute",
  slug: "endurance",
  definition: "what Alan has built by moving his body",
  pointUnit: "200 active calories burned",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two hundred calories burned moving is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The points are the active calories the tracking day carries turned into points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no active calories earns nothing rather than an endurance of zero.",
    },
  ],
  createdAt: "2026-09-03T17:12:06.766Z",
  updatedAt: "2026-10-18T13:43:32.840Z",
} as const satisfies Attribute
