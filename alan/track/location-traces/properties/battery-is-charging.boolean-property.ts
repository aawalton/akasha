import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type BatteryIsCharging = boolean

export const batteryIsCharging = {
  id: "01a06935-68b3-7bb6-80e2-1d79d253f0c3",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "battery-is-charging",
  propertySlug: "battery-is-charging",
  definition: "whether the device was on power",
} as const satisfies BooleanProperty
