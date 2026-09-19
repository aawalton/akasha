import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deviceSecretUserId = {
  id: "01a05b39-f50c-7103-abe2-bf3c03f7aab4",
  type: "page-type/text-property",
  slug: "device-secret-user-id",
  propertySlug: "user-id",
  definition: "the account a device secret was minted for",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This user id is the account a person states rather than that person's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This user id is an account and never a contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A device secret minted under a session names a contributor and states no account.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
