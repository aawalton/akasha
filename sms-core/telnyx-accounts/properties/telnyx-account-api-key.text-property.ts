import type { TextProperty } from "@akasha/pages-system/text-property"

export type TelnyxAccountApiKey = string

export const telnyxAccountApiKey = {
  id: "01a06861-e7cd-71da-a17b-26badf17e332",
  pageTypeSlug: "text-property",
  slug: "telnyx-account-api-key",
  propertySlug: "api-key",
  definition: "what authorises a send",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
