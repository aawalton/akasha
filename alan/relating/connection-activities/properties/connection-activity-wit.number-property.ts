import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ConnectionActivityWit = number

export const connectionActivityWit = {
  id: "01a0658e-c30e-766e-baf9-28c05102103f",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "connection-activity-wit",
  propertySlug: "connection-activity-wit",
  definition: "how quick they are",
  max: null,
} as const satisfies NumberProperty
