import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { Max } from "akasha/page/type/page-property/properties/max.number-property.types.ts"

export type NumberProperty = PageProperty & {
  max: Max
}
