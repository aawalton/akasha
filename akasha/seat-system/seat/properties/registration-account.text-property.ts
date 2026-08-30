import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RegistrationAccount = string

export const registrationAccount = {
  id: "01a05035-2609-7b8c-9423-61f1994b6bd5",
  pageTypeSlug: "text-property",
  slug: "registration-account",
  definition: "the account an agent in a seat signs in as",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds text because no account stands as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to an account.",
    },
  ],
} as const satisfies TextProperty
