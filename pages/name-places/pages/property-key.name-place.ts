import type { NamePlace } from "../name-place.page-type.types.ts"

export const propertyKey = {
  id: "01a04fed-2fbf-7545-aff5-168ae23e9052",
  pageTypeSlug: "name-place",
  type: "name-place",
  slug: "property-key",
  definition: "the key a page has one of its values under",
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is read in code.",
    },
    {
      invariantKind: "departure",
      statement: "The property the key names is called by its slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "Lowering each capital and setting a dash before that capital gives the slug back.",
    },
    {
      invariantKind: "departure",
      statement: "The key and the slug are one name in two formats rather than two spellings.",
    },
  ],
} as const satisfies NamePlace
