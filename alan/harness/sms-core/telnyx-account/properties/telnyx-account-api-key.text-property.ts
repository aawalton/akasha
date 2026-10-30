import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const telnyxAccountApiKey = {
  id: "01a06861-e7cd-71da-a17b-26badf17e332",
  type: "page-type/text-property",
  slug: "telnyx-account-api-key",
  propertySlug: "api-key",
  definition: "the secret a request to Telnyx carries",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T17:47:21.933Z",
  updatedAt: "2026-10-30T16:10:01.412Z",
} as const satisfies TextProperty
