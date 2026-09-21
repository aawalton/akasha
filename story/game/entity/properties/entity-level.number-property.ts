import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const entityLevel = {
  id: "01a0c633-ff8f-783d-ba86-1f1ce92d4b42",
  type: "page-type/number-property",
  slug: "entity-level",
  propertySlug: "level",
  definition: "how far this one has come up its game's ladder",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity in a game that levels nobody says no level.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
