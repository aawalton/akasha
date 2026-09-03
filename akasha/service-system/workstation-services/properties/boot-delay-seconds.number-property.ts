import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BootDelaySeconds = number

export const bootDelaySeconds = {
  id: "01a06738-9f12-7708-9570-5125a153a4e9",
  pageTypeSlug: "number-property",
  slug: "boot-delay-seconds",
  propertySlug: "boot-delay-seconds",
  definition: "how long after boot a timer first runs",
  max: null,
} as const satisfies NumberProperty
