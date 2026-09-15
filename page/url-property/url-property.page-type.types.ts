import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { MaxLength } from "akasha/page/type/page-property/properties/max-length.number-property.types.ts"

export type UrlProperty = PageProperty & {
  maxLength: MaxLength
}
