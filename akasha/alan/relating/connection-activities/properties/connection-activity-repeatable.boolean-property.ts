import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ConnectionActivityRepeatable = boolean

export const connectionActivityRepeatable = {
  id: "01a0658e-c30e-7e5a-a8ac-ce8fb0ff0309",
  pageTypeSlug: "boolean-property",
  slug: "connection-activity-repeatable",
  propertySlug: "connection-activity-repeatable",
  definition: "whether it keeps paying when he does it again",
} as const satisfies BooleanProperty
