import type { TextProperty } from "@akasha/pages-system/text-property"

export type TitleKey = string

export const titleKey = {
  id: "01a06240-340f-700c-8b23-d85323898292",
  pageTypeSlug: "text-property",
  slug: "title-key",
  propertySlug: "title-key",
  definition: "the text a track title and an artist name are matched by",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A title key is a track name and then `|` and then an artist name.",
    },
    {
      invariantKind: "departure",
      statement: "A title key holds only lowercase letters and digits either side of `|`.",
    },
  ],
} as const satisfies TextProperty
