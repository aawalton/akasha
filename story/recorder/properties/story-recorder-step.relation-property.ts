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
  createdAt: "2026-10-03T15:16:28.667Z",
  updatedAt: "2026-10-03T15:17:18.000Z",
} as const satisfies RelationProperty
