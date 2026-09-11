import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const telnyxAccountApiKey = {
  id: "01a06861-e7cd-71da-a17b-26badf17e332",
  type: "text-property",
  slug: "telnyx-account-api-key",
  propertySlug: "api-key",
  definition: "what authorises a send",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
