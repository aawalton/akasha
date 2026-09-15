import type { NameFormat } from "akasha/page/text-property/properties/name-format.relation-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { MaxLength } from "akasha/page/type/page-property/properties/max-length.number-property.types.ts"

export type TextProperty = PageProperty & {
  maxLength: MaxLength
  nameFormat: NameFormat
}
