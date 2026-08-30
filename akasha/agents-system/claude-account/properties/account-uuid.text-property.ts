import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type AccountUuid = string

export const accountUuid = {
  id: "01a054d8-1d39-7b26-b3d7-5857ea15a1b4",
  pageTypeSlug: "text-property",
  slug: "account-uuid",
  propertySlug: "account-uuid",
  definition: "the identity Anthropic knows the account by",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is answered by the upstream probe rather than chosen here.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose uuid changes is another account under the same slug.",
    },
  ],
} as const satisfies TextProperty
