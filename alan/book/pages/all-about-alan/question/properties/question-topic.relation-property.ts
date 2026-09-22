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
} as const satisfies RelationProperty
