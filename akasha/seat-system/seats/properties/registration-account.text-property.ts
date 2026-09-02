import type { TextProperty } from "@akasha/pages-system/text-property"

export type RegistrationAccount = string

export const registrationAccount = {
  id: "01a05397-7f9b-783b-b5ec-f0b163957fdf",
  pageTypeSlug: "text-property",
  slug: "registration-account",
  propertySlug: "registration-account",
  definition: "the account an agent in a seat signs in as",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "No account stands as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to an account.",
    },
  ],
} as const satisfies TextProperty
