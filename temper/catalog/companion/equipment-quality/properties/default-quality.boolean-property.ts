import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const defaultQuality = {
  id: "01a0df76-357c-7ad0-ac0d-8d773a9a8772",
  type: "page-type/boolean-property",
  slug: "default-quality",
  propertySlug: "default-quality",
  definition: "whether gear that states no quality of its own is read at this quality",
  types: "ts",
} as const satisfies BooleanProperty
