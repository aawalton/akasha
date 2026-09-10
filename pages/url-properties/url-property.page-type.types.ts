import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { MaxLength } from "../types/page-properties/properties/max-length.number-property.types.ts"

export type UrlProperty = PageProperty & {
  maxLength: MaxLength
}
