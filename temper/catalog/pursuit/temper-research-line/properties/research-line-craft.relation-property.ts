import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const researchLineCraft = {
  id: "01a0cae1-5ebb-7a80-8698-3ddc1defc59a",
  type: "page-type/relation-property",
  slug: "research-line-craft",
  propertySlug: "parent",
  definition: "the craft a research line is researched under",
  targetPageType: "page-type/temper-craft-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A research line hangs beneath a craft rather than another research line.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
