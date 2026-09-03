import type { SelectProperty } from "@akasha/pages-system/select-property"

export const connectionActivityModality = {
  id: "01a0658e-c30e-784d-97bf-716f7ed651a5",
  pageTypeSlug: "select-property",
  slug: "connection-activity-modality",
  propertySlug: "connection-activity-modality",
  definition: "the senses it reaches him through",
  values: ["audio", "digital-presence", "image", "presence", "text"],
} as const satisfies SelectProperty

export type ConnectionActivityModality = (typeof connectionActivityModality.values)[number]
