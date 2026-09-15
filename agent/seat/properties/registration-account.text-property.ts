import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const registrationAccount = {
  id: "01a05397-7f9b-783b-b5ec-f0b163957fdf",
  type: "text-property",
  slug: "registration-account",
  propertySlug: "registration-account",
  definition: "the account an agent in a seat signs in as",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "No account is a page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This property is a relation to an account.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
