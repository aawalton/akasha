import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const holdingValue = {
  id: "01a0680a-1a00-7015-9c68-3f8a1d4e1115",
  type: "page-type/number-property",
  slug: "holding-value",
  propertySlug: "holding-value",
  definition: "the dollars an investment an account holds can sell for",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is carried as the sync read that value rather than rounded to the cent.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:49:28.783Z",
} as const satisfies NumberProperty
