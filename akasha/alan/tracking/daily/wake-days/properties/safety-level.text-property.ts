import type { TextProperty } from "@akasha/pages-system/text-property"

export type SafetyLevel = string

export const safetyLevel = {
  id: "01a05fd8-c30f-757c-bda6-861e73844e8b",
  pageTypeSlug: "text-property",
  slug: "safety-level",
  propertySlug: "safety-level",
  definition: "how safe Alan was over a stretch of time",
  max: 3,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A safety level reads as a number and is written as text.",
    },
    {
      invariantKind: "departure",
      statement: "A safety level carries forward from the prior stretch of time.",
    },
  ],
} as const satisfies TextProperty
