import type { TextProperty } from "../../pages/text-properties/text-property.page-type.types.ts"

export type PluralSlug = string

export const pluralSlug = {
  id: "01a04fd9-50dd-74e4-86cd-6f72698418e2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "plural-slug",
  propertySlug: "plural-slug",
  definition: "the slug for many of what a domain is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plural is stated rather than worked out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder with a page that states a plural slug takes its name from that plural slug.",
    },
  ],
} as const satisfies TextProperty
