import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ConnectionActivityAttn = number

export const connectionActivityAttn = {
  id: "01a0658e-c30d-788e-acc6-7d06be5af838",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "connection-activity-attn",
  propertySlug: "connection-activity-attn",
  definition: "how much of their attention is on him",
  max: null,
} as const satisfies NumberProperty
