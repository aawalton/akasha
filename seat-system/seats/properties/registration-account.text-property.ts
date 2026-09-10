import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RegistrationAccount = string

export const registrationAccount = {
  id: "01a05397-7f9b-783b-b5ec-f0b163957fdf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "registration-account",
  propertySlug: "registration-account",
  definition: "the account an agent in a seat signs in as",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "No account is a page.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to an account.",
    },
  ],
} as const satisfies TextProperty
