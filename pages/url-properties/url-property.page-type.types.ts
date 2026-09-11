import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"
import type { MaxLength } from "akasha/pages/types/page-properties/properties/max-length.number-property.types.ts"

export type UrlProperty = PageProperty & {
  maxLength: MaxLength
}
