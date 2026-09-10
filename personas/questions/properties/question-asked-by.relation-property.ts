import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type QuestionAskedBy = Slug

export const questionAskedBy = {
  id: "01a06823-89b2-7002-ab72-c525aa8adb1e",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "question-asked-by",
  propertySlug: "asked-by",
  definition: "the persona who put a question to Alan",
  targetPageType: "page-type/persona",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A question is put by a persona rather than by the seat that persona was working from.",
    },
    {
      invariantKind: "departure",
      statement: "The persona who put a question is the persona Alan's answer comes back to.",
    },
  ],
} as const satisfies RelationProperty
