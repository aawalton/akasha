import type { TextProperty } from "@akasha/pages-system/text-property"

export type RecordBookSlug = string

export const recordBookSlug = {
  id: "01a0657d-b91d-7100-a6a6-4e66e1a75ab3",
  pageTypeSlug: "text-property",
  slug: "record-book-slug",
  propertySlug: "book-slug",
  definition: "the book a record is kept about",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "The books named here are not pages yet.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a book.",
    },
  ],
} as const satisfies TextProperty
