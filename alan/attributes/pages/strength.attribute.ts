import type { Attribute } from "../attribute.page-type.ts"

export const strength = {
  id: "01a06841-a1b4-731f-8d52-fe93c3564922",
  pageTypeSlug: "attribute",
  type: "attribute",
  slug: "strength",
  definition: "what Alan has built by lifting weight",
  pointUnit: "1000 kilograms lifted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A thousand kilograms moved is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A thousand kilograms is 2204.62 pounds.",
    },
    {
      invariantKind: "departure",
      statement: "The points are the pounds the tracking day carries turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no pounds earns nothing rather than a strength of zero.",
    },
  ],
} as const satisfies Attribute
