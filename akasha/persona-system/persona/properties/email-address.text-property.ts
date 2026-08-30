import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type EmailAddress = string

export const emailAddress = {
  id: "01a05362-e8f6-79ac-a787-5d06f4d26808",
  pageTypeSlug: "text-property",
  slug: "email-address",
  definition: "the address a persona sends and receives mail at",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
