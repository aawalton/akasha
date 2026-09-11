import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const firstListen = {
  id: "01a06240-340f-7005-939a-88252e0e69fc",
  type: "boolean-property",
  slug: "first-listen",
  propertySlug: "first-listen",
  definition: "whether a play was the first play of its track",
  types: "ts",
} as const satisfies BooleanProperty
