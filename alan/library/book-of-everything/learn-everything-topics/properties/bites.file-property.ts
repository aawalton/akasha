import type { FileProperty } from "@akasha/pages-system/file-property"

export type Bites = "md"

export const bites = {
  id: "01a0659f-93da-700c-8585-47a8e0aec2d9",
  pageTypeSlug: "file-property",
  slug: "bites",
  propertySlug: "bites",
  definition: "the small things to study next in a topic, in rotation order",
} as const satisfies FileProperty
