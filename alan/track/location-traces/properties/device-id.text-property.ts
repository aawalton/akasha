import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const deviceId = {
  id: "01a06935-68b4-72ac-b5c0-d7e1e552baee",
  type: "text-property",
  slug: "device-id",
  propertySlug: "device-id",
  definition: "which of Alan's devices took this trace",
  maxLength: 64,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
