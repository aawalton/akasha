import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type PersonaDays = List<string>

export const personaDays = {
  id: "01a05fd8-c30f-71d2-a7a7-d6ae91a75e9b",
  pageTypeSlug: "text-property",
  slug: "persona-days",
  propertySlug: "persona-days",
  definition: "every persona day recorded against a day",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a persona day.",
    },
  ],
} as const satisfies TextProperty
