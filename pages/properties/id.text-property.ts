import type { TextProperty } from "../text-properties/text-property.page-type.ts"

export type Id = string

export const id = {
  id: "01a049b9-856c-7ee7-b958-f63eead00582",
  pageTypeSlug: "text-property",
  slug: "id",
  propertySlug: "id",
  definition: "the identity a page keeps for its whole life",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  unique: "always",
  generator: "uuid-v7",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page being created states no id of its own.",
    },
    {
      invariantKind: "gap",
      statement: "An id stated by hand is judged by no check on a mechanical landing.",
    },
  ],
} as const satisfies TextProperty
