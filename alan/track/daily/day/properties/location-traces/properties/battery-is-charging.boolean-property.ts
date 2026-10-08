import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const batteryIsCharging = {
  id: "01a06935-68b3-7bb6-80e2-1d79d253f0c3",
  type: "page-type/boolean-property",
  slug: "battery-is-charging",
  propertySlug: "battery-is-charging",
  definition: "whether the device was on power",
  types: "ts",
  createdAt: "2026-09-03T21:38:23.027Z",
  updatedAt: "2026-09-21T19:18:52.000Z",
} as const satisfies BooleanProperty
