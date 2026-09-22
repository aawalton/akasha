import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const registrationAccount = {
  id: "01a05397-7f9b-783b-b5ec-f0b163957fdf",
  type: "page-type/text-property",
  slug: "registration-account",
  propertySlug: "registration-account",
  definition: "the account an agent in a seat signs in as",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A running supervisor writes this value and hands it on as a bare name.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a model account.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
