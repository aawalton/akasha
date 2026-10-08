import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const imageSeed = {
  id: "01a0e39e-b242-7997-9eac-8f7f0a3b2180",
  type: "page-type/number-property",
  slug: "image-seed",
  propertySlug: "image-seed",
  definition: "the seed every picture of a story is rendered at",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One seed keeps the pictures of one story alike.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-27T16:07:03.490Z",
  updatedAt: "2026-09-27T16:07:07.000Z",
} as const satisfies NumberProperty
