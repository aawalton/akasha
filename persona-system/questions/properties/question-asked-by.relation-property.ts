import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type QuestionAskedBy = Slug

export const questionAskedBy = {
  id: "01a06823-89b2-7002-ab72-c525aa8adb1e",
  pageTypeSlug: "relation-property",
  slug: "question-asked-by",
  propertySlug: "asked-by",
  definition: "the persona who put a question to Alan",
  targetPageTypeSlug: "page-type/persona",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question is put by a persona rather than by the seat she was working from.",
    },
    {
      invariantKind: "departure",
      statement: "The persona who put a question is the persona Alan's answer comes back to.",
    },
  ],
} as const satisfies RelationProperty
