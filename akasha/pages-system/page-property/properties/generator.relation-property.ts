import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type Generator = "uuid-v7" | "next-seq"

export const generator = {
  id: "01a04f17-5b7b-7835-87db-af7b36e912b5",
  pageTypeSlug: "relation-property",
  slug: "generator",
  definition: "how this property's value is worked out when its page is created",
  targetPageTypeSlug: "page-type/generator-kind",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property stating no `generator` is written by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generated property is filled as its page is created, never on one already standing.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing fills a generated property yet, so stating one leaves the value to the writer.",
    },
  ],
} as const satisfies RelationProperty
