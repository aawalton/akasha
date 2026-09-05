import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Images = List<string>

export const images = {
  id: "01a06596-f0d5-700a-afd0-623e8cd3d142",
  pageTypeSlug: "text-property",
  slug: "images",
  propertySlug: "images",
  definition: "every picture a card has been drawn as",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The picture a card is shown by is one of these pictures.",
    },
  ],
} as const satisfies TextProperty
