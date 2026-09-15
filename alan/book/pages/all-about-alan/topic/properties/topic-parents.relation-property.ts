import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const topicParents = {
  id: "01a0655a-b2b5-76ec-9521-af5a75eb52c5",
  type: "relation-property",
  slug: "topic-parents",
  propertySlug: "parents",
  definition: "the topics a topic sits under",
  targetPageType: "page-type/all-about-alan-topic",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A topic lists nothing standing beneath that topic.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This edge is read inverted.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
