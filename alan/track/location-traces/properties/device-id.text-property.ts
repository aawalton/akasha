import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DeviceId = string

export const deviceId = {
  id: "01a06935-68b4-72ac-b5c0-d7e1e552baee",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "device-id",
  propertySlug: "device-id",
  definition: "which of Alan's devices took this trace",
  maxLength: 64,
  nameFormat: null,
} as const satisfies TextProperty
