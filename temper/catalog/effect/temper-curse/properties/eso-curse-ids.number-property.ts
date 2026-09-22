import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoCurseIds = {
  id: "01a05fc5-94cd-7c97-9330-6c78011127fa",
  type: "page-type/number-property",
  slug: "eso-curse-ids",
  propertySlug: "eso-curse-ids",
  definition: "a curse's marking abilities in The Elder Scrolls Online",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every ability the game marks one curse by.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
