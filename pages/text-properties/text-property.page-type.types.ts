import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { MaxLength } from "../types/page-properties/properties/max-length.number-property.ts"
import type { NameFormat } from "./properties/name-format.relation-property.ts"

export type TextProperty = PageProperty & {
  maxLength: MaxLength
  nameFormat: NameFormat
}
