import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const gateMultiplier = {
  id: "01a0c648-438e-75d3-8dc0-9756a5727a38",
  type: "page-type/number-property",
  slug: "gate-multiplier",
  propertySlug: "multiplier",
  definition: "what a gate does to a strike it opens or closes on",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gate under one shuts a strike down and a gate over one lets it through.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
