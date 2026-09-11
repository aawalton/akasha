import type { NameFormat } from "akasha/pages/text-properties/properties/name-format.relation-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"
import type { MaxLength } from "akasha/pages/types/page-properties/properties/max-length.number-property.types.ts"

export type TextProperty = PageProperty & {
  maxLength: MaxLength
  nameFormat: NameFormat
}
