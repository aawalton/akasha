import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicParents = {
  id: "01a0655a-b2b5-76ec-9521-af5a75eb52c5",
  type: "page-type/relation-property",
  slug: "topic-parents",
  propertySlug: "parents",
  definition: "a topic's parent topics",
  targetPageType: "page-type/all-about-alan-topic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic lists nothing standing beneath that topic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This edge is read inverted.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
