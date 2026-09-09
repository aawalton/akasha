import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type Images = List<string>

export const images = {
  id: "01a06596-f0d5-700a-afd0-623e8cd3d142",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "images",
  propertySlug: "images",
  definition: "every picture a card has been drawn as",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The picture a card is shown by is drawn from these pictures.",
    },
  ],
} as const satisfies TextProperty
