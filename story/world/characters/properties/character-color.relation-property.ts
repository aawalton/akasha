import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterColor = {
  id: "01a1839b-a795-783f-ac0e-45f5e2010078",
  type: "page-type/relation-property",
  slug: "character-color",
  propertySlug: "color",
  definition: "the color a character's name is drawn in",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character stating no color has its name drawn as any other text is.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T17:42:58.708Z",
  updatedAt: "2026-10-28T17:42:58.708Z",
} as const satisfies RelationProperty
