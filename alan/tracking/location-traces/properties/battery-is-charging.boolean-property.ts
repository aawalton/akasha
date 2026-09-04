import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type BatteryIsCharging = boolean

export const batteryIsCharging = {
  id: "01a06935-68b3-7bb6-80e2-1d79d253f0c3",
  pageTypeSlug: "boolean-property",
  slug: "battery-is-charging",
  propertySlug: "battery-is-charging",
  definition: "whether the device was on power",
} as const satisfies BooleanProperty
