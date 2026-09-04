import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Ssd = number

export const ssd = {
  id: "01a0658c-329a-705c-a576-fd80359ff2ee",
  pageTypeSlug: "number-property",
  slug: "ssd",
  propertySlug: "ssd",
  definition: "how many gigabytes of solid-state disk it holds",
  max: null,
} as const satisfies NumberProperty
