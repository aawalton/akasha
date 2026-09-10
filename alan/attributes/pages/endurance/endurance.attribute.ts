import type { Attribute } from "../../attribute.page-type.types.ts"

export const endurance = {
  id: "01a06841-a16e-7bcb-a31a-fba64ce8de69",
  pageTypeSlug: "attribute",
  type: "attribute",
  slug: "endurance",
  definition: "what Alan has built by moving his body",
  pointUnit: "200 active calories burned",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two hundred calories burned moving is one point.",
    },
    {
      invariantKind: "departure",
      statement: "The points are the active calories the tracking day carries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no active calories earns nothing rather than an endurance of zero.",
    },
  ],
} as const satisfies Attribute
