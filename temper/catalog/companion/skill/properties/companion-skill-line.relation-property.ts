import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const companionSkillLine = {
  id: "01a0cad6-787b-7695-9873-1e5fd26d5b56",
  type: "page-type/relation-property",
  slug: "companion-skill-line",
  propertySlug: "skill-line-id",
  definition: "the line a companion skill belongs to",
  targetPageType: "page-type/temper-companion-skill-line",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's line and a character's line are two page types.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
