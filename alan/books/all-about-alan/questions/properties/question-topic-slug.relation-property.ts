import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type QuestionTopicSlug = Slug

export const questionTopicSlug = {
  id: "01a077d9-0c68-7b67-bedd-fe9a66246acf",
  pageTypeSlug: "relation-property",
  slug: "question-topic-slug",
  propertySlug: "topic-slug",
  definition: "the topic a question is open on",
  targetPageTypeSlug: "page-type/all-about-alan-topic",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This edge is read inverted.",
    },
  ],
} as const satisfies RelationProperty
