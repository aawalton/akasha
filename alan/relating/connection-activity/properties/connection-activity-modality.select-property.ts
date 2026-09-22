import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const connectionActivityModality = {
  id: "01a0658e-c30e-784d-97bf-716f7ed651a5",
  type: "page-type/select-property",
  slug: "connection-activity-modality",
  propertySlug: "connection-activity-modality",
  definition: "the senses carrying an activity to him",
  values: ["audio", "digital-presence", "image", "presence", "text"],
  types: "ts",
} as const satisfies SelectProperty
