import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const safetyLevel = {
  id: "01a05fd8-c30f-757c-bda6-861e73844e8b",
  type: "page-type/text-property",
  slug: "safety-level",
  propertySlug: "safety-level",
  definition: "how safe Alan was over a stretch of time",
  maxLength: 3,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A safety level is taken as a number and is written as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A safety level carries forward from the prior stretch of time.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
