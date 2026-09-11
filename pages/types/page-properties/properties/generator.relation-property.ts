import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const generator = {
  id: "01a04f17-5b7b-7835-87db-af7b36e912b5",
  type: "relation-property",
  slug: "generator",
  propertySlug: "generator",
  definition: "how this property's value is worked out when its page is created",
  targetPageType: "page-type/generator-kind",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property stating no `generator` is written by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A page being created that states the property keeps the value the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A body carried from another path is left as the body stands.",
    },
    {
      invariantKind: "departure",
      statement: "A move is one page arriving somewhere else rather than a second page.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
