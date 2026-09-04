import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Meals = List<string>

export const meals = {
  id: "01a05fd8-c30f-7952-9ba0-4a131ba3347a",
  pageTypeSlug: "text-property",
  slug: "meals",
  propertySlug: "meals",
  definition: "every meal recorded against a day",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a meal.",
    },
  ],
} as const satisfies TextProperty
