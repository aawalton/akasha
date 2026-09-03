import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Hdd = number

export const hdd = {
  id: "01a0658c-329a-733b-bf0c-593a5b368831",
  pageTypeSlug: "number-property",
  slug: "hdd",
  propertySlug: "hdd",
  definition: "how many gigabytes of spinning disk it holds",
  max: null,
} as const satisfies NumberProperty
