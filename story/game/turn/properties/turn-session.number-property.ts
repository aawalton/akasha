import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const turnSession = {
  id: "01a0c67e-edaf-759d-a975-fa14623c50c4",
  type: "page-type/number-property",
  slug: "turn-session",
  propertySlug: "session",
  definition: "which sitting of its game's play this turn was taken in",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A sitting is no page of its own, and is counted on the turns taken in it.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
