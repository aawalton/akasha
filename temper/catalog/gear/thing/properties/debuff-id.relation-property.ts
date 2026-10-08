import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const debuffId = {
  id: "01a05fd1-d439-75b3-92b0-1243e1ad274a",
  type: "page-type/relation-property",
  slug: "debuff-id",
  propertySlug: "debuff-id",
  definition: "the harmful effect a thing puts on its target",
  targetPageType: "page-type/temper-debuff-minor",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every harmful effect a thing puts on its target is a minor one.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:53:02.009Z",
  updatedAt: "2026-09-22T16:42:13.000Z",
} as const satisfies RelationProperty
