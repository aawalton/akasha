import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"
import type { Max } from "akasha/pages/types/page-properties/properties/max.number-property.types.ts"

export type NumberProperty = PageProperty & {
  max: Max
}
