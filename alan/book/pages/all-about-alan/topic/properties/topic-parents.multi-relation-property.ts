import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const topicParents = {
  id: "01a0655a-b2b5-76ec-9521-af5a75eb52c5",
  type: "page-type/multi-relation-property",
  slug: "topic-parents",
  propertySlug: "parents",
  definition: "the parents of a topic",
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
  createdAt: "2026-09-03T03:40:37.941Z",
  updatedAt: "2026-10-30T15:03:41.787Z",
} as const satisfies MultiRelationProperty
