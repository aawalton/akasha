import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Target = string

export const personAccessTarget = {
  id: "01a05430-c0ee-7f62-a8b7-74d97d845e28",
  pageTypeSlug: "text-property",
  slug: "person-access-target",
  propertySlug: "target",
  definition: "the one thing of that kind the access reaches, or `all`",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A target of `all` is every target of that kind, and is the only pattern an access takes.",
    },
  ],
} as const satisfies TextProperty
