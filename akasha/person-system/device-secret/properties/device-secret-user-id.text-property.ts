import type { TextProperty } from "@akasha/pages-system/text-property"

export type UserId = string

export const deviceSecretUserId = {
  id: "01a05b39-f50c-7103-abe2-bf3c03f7aab4",
  pageTypeSlug: "text-property",
  slug: "device-secret-user-id",
  propertySlug: "user-id",
  definition: "the account a device secret was minted for",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This user id is the account a person states rather than that person's slug.",
    },
  ],
} as const satisfies TextProperty
