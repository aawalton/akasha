import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const bites = {
  id: "01a0659f-93da-700c-8585-47a8e0aec2d9",
  type: "file-property",
  slug: "bites",
  propertySlug: "bites",
  definition: "the small things to study next in a topic, in rotation order",
  extensions: ["md"],
  types: "ts",
} as const satisfies FileProperty
