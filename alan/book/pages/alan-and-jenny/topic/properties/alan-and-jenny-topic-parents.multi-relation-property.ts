import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const alanAndJennyTopicParents = {
  id: "01a16f48-1aba-7463-9b18-32085944bc1c",
  type: "page-type/multi-relation-property",
  slug: "alan-and-jenny-topic-parents",
  propertySlug: "parents",
  definition: "a topic's parent topics in Alan and Jenny's notes",
  targetPageType: "page-type/alan-and-jenny-topic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic lists nothing that sits beneath that topic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This edge is read inverted.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T18:59:18.841Z",
  updatedAt: "2026-10-24T18:59:18.841Z",
} as const satisfies MultiRelationProperty
