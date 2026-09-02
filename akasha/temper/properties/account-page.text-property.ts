import type { TextProperty } from "@akasha/pages-system/text-property"

export type AccountPage = string

export const accountPage = {
  id: "01a05fba-ce37-7ab7-ac79-b568699606b3",
  pageTypeSlug: "text-property",
  slug: "account-page",
  propertySlug: "account-page",
  definition: "the account a page belongs to",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  an account." }],
} as const satisfies TextProperty
