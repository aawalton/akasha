import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setDlcId = {
  id: "01a0d8e1-0ebe-7b74-9b2c-3f6b75f6b089",
  type: "page-type/number-property",
  slug: "set-dlc-id",
  propertySlug: "set-dlc-id",
  definition: "the number the sets addon gives the release that brought a set",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
