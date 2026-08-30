import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type Generator = "uuid-v7"

export const generator = {
  id: "01a04f17-5b7b-7835-87db-af7b36e912b5",
  pageTypeSlug: "relation-property",
  slug: "generator",
  propertySlug: "generator",
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
        "A generated property is filled as its page is created rather than on one already standing.",
    },
    {
      invariantKind: "departure",
      statement: "A page being created that states the property keeps what it states.",
    },
    {
      invariantKind: "departure",
      statement: "A body carried from another path is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A move is one page arriving somewhere else rather than a second page.",
    },
  ],
} as const satisfies RelationProperty
