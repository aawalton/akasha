import type { TextProperty } from "@akasha/pages-system/text-property"

export type DeviceId = string

export const deviceId = {
  id: "01a06935-68b4-72ac-b5c0-d7e1e552baee",
  pageTypeSlug: "text-property",
  slug: "device-id",
  propertySlug: "device-id",
  definition: "which of Alan's devices took this trace",
  max: 64,
  nameFormatSlug: null,
} as const satisfies TextProperty
