import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const storyRecorderStep = {
  id: "01a10256-8b7b-722b-a02b-242a3b37d25c",
  type: "page-type/relation-property",
  slug: "story-recorder-step",
  propertySlug: "step",
  definition: "the step a story recorder runs at",
  targetPageType: "page-type/step-status",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story recorder stating no step runs at recorders.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
