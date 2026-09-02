import type { TextProperty } from "@akasha/pages-system/text-property"

export type SortOrder = "label" | "place"

export const sortOrder = {
  id: "01a063bd-a526-7474-a7c9-3980d10c48b3",
  pageTypeSlug: "text-property",
  slug: "sort-order",
  propertySlug: "sort-order",
  definition: "whether a group draws its readings in label order or in place order",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group stating nothing draws in label order.",
    },
    {
      invariantKind: "departure",
      statement: "Two readings sharing one place draw in label order between the two.",
    },
  ],
} as const satisfies TextProperty
