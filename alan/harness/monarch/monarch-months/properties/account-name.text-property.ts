import type { TextProperty } from "@akasha/pages-system/text-property"

export type AccountName = string

export const accountName = {
  id: "01a0680b-2b00-7005-8f52-6a1c3d8b2106",
  pageTypeSlug: "text-property",
  slug: "account-name",
  propertySlug: "account-name",
  definition: "the account a transaction ran through, as the statement names it",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
