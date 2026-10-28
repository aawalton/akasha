import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const abilityKind = {
  id: "01a17ff1-08c1-77f0-a51f-086702ca6b44",
  type: "page-type/relation-property",
  slug: "ability-kind",
  propertySlug: "ability-kind",
  definition: "the kind of ability a skill is in its world",
  targetPageType: "page-type/world-ability-kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill a character holds is of the ability kind of the world's skill it names.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T00:37:45.279Z",
  updatedAt: "2026-10-28T00:37:45.279Z",
} as const satisfies RelationProperty
