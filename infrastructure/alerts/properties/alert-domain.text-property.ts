import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AlertDomain = string

export const alertDomain = {
  id: "01a06755-0778-78ee-bf36-f7fd5ffa5619",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "alert-domain",
  propertySlug: "domain",
  definition: "the area a raised alert is owed to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An area is named here as text rather than reached as a page.",
    },
    {
      invariantKind: "departure",
      statement: "An area named here is not always a page in akasha yet.",
    },
    {
      invariantKind: "departure",
      statement: "An alert naming a person is owed to that person rather than to an area.",
    },
  ],
} as const satisfies TextProperty
