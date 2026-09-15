import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  type: "text-property",
  slug: "slug",
  propertySlug: "slug",
  definition: "the name a page is reached by",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  unique: "unique-kind/page-type",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A slug that cannot become a page's export name is no slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
