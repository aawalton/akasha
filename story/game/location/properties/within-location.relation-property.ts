import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const withinLocation = {
  id: "01a0c643-9ff8-7920-b68e-f2f869684b86",
  type: "page-type/relation-property",
  slug: "within-location",
  propertySlug: "within",
  definition: "a place's parent place",
  targetPageType: "page-type/game-location",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside no other place is somewhere its game opens on.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
