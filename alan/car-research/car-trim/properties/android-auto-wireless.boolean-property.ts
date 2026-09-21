import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const androidAutoWireless = {
  id: "01a0c542-1a8c-784f-8fc5-b90d792984f7",
  type: "page-type/boolean-property",
  slug: "android-auto-wireless",
  propertySlug: "android-auto-wireless",
  definition: "whether Android Auto runs over the air rather than over a cable",
  types: "ts",
} as const satisfies BooleanProperty
