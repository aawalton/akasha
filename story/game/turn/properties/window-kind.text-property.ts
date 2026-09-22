import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const windowKind = {
  id: "01a0c67f-cf68-709d-b1aa-f17278bd8ecd",
  type: "page-type/text-property",
  slug: "window-kind",
  propertySlug: "kind",
  definition: "what the system raised a window to say: a level, a skill, an affinity, an award",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
