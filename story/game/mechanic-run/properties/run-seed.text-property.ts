import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runSeed = {
  id: "01a0c952-1e0c-71c7-87a7-ad9e38ef7a05",
  type: "page-type/text-property",
  slug: "run-seed",
  propertySlug: "seed",
  definition: "what the dice of a run were thrown from",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw no dice states no seed.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
