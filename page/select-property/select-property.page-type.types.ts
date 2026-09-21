import type { SelectOptionColors } from "akasha/page/select-property/properties/select-option-colors.record-property.types.ts"
import type { SelectValues } from "akasha/page/select-property/properties/select-values.text-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type SelectProperty = PageProperty & {
  values: SelectValues
  optionColors?: SelectOptionColors
}
