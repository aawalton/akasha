import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Max } from "../types/page-properties/properties/max.number-property.types.ts"

export type NumberProperty = PageProperty & {
  max: Max
}
