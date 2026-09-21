import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const carplayWireless = {
  id: "01a0c542-2b66-7faa-a19f-669de7561450",
  type: "page-type/boolean-property",
  slug: "carplay-wireless",
  propertySlug: "carplay-wireless",
  definition: "whether CarPlay runs over the air rather than over a cable",
  types: "ts",
} as const satisfies BooleanProperty
