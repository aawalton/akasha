import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoTaxesFees = {
  id: "01a0c547-cd10-7363-a792-2e4554f49493",
  type: "page-type/number-property",
  slug: "tco-taxes-fees",
  propertySlug: "tco-taxes-fees",
  definition: "what tax and registration are reckoned to cost over those years, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
