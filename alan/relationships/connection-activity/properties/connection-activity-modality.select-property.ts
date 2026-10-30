import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const connectionActivityModality = {
  id: "01a0658e-c30e-784d-97bf-716f7ed651a5",
  type: "page-type/select-property",
  slug: "connection-activity-modality",
  propertySlug: "connection-activity-modality",
  definition: "how an activity reaches Alan",
  values: ["audio", "digital-presence", "image", "presence", "text"],
  types: "ts",
  createdAt: "2026-09-03T04:37:29.998Z",
  updatedAt: "2026-10-30T16:24:49.508Z",
} as const satisfies SelectProperty
