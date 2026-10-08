import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const questionTopic = {
  id: "01a077d9-0c68-7b67-bedd-fe9a66246acf",
  type: "page-type/relation-property",
  slug: "question-topic",
  propertySlug: "topic",
  definition: "a question's topic",
  targetPageType: "page-type/all-about-alan-topic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This edge is read inverted.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T17:51:48.328Z",
  updatedAt: "2026-09-22T13:54:40.000Z",
} as const satisfies RelationProperty
