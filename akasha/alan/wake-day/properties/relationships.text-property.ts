import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Relationships = List<string>

export const relationships = {
  id: "01a05fd8-c30f-754a-bb2e-de6ec74d6e4a",
  pageTypeSlug: "text-property",
  slug: "relationships",
  propertySlug: "relationships",
  definition: "the people a stretch of time was spent with",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a person.",
    },
  ],
} as const satisfies TextProperty
