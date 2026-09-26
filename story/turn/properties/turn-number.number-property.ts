import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const turnNumber = {
  id: "01a0c67e-d63a-7fab-b15d-5700bade864e",
  type: "page-type/number-property",
  slug: "turn-number",
  propertySlug: "number",
  definition: "which turn of its story's play this is",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's number orders its story's play.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
