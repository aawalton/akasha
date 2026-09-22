import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accountUuid = {
  id: "01a054d8-1d39-7b26-b3d7-5857ea15a1b4",
  type: "page-type/text-property",
  slug: "account-uuid",
  propertySlug: "account-uuid",
  definition: "the account's identity at Anthropic",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The account uuid is answered by the upstream probe rather than chosen here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose uuid changes is another account under the same slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
