import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const personAccessTarget = {
  id: "01a05430-c0ee-7f62-a8b7-74d97d845e28",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "person-access-target",
  propertySlug: "target",
  definition: "the one thing of that kind the access reaches, or `all`",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A target of `all` is every target of that kind and is the only pattern an access takes.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
