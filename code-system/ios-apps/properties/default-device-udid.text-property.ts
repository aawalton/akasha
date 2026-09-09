import type { TextProperty } from "@akasha/pages/text-property"

export type DefaultDeviceUdid = string

export const defaultDeviceUdid = {
  id: "01a06289-79d6-72a5-ab7c-3b93f6a436a5",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "default-device-udid",
  propertySlug: "default-device-udid",
  definition: "the device an app is installed on when the call names none",
  maxLength: 40,
  nameFormat: null,
} as const satisfies TextProperty
