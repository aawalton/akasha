import type { TextProperty } from "@akasha/pages-system/text-property"

export type AlertDomain = string

export const alertDomain = {
  id: "01a06755-0778-78ee-bf36-f7fd5ffa5619",
  pageTypeSlug: "text-property",
  slug: "alert-domain",
  propertySlug: "domain",
  definition: "the area a raised alert is owed to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An area is named here as text rather than reached as a page.",
    },
    {
      invariantKind: "departure",
      statement: "Some of the areas named here are yet to move into akasha.",
    },
    {
      invariantKind: "departure",
      statement: "An alert naming a person is owed to that person rather than to an area.",
    },
  ],
} as const satisfies TextProperty
