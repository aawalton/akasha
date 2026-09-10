import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Max } from "../types/page-properties/properties/max.number-property.ts"

export type NumberProperty = PageProperty & {
  max: Max
}
