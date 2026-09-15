import type { Max } from "akasha/page/number-property/properties/max.number-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type NumberProperty = PageProperty & {
  max: Max
}
