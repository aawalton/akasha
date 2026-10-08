import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accountName = {
  id: "01a0680b-2b00-7005-8f52-6a1c3d8b2106",
  type: "page-type/text-property",
  slug: "account-name",
  propertySlug: "account-name",
  definition: "the account a transaction ran through, as the statement names it",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-09-15T16:24:02.000Z",
} as const satisfies TextProperty
