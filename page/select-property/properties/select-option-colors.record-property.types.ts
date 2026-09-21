import type { SelectOptionColor } from "akasha/page/select-property/properties/select-option-color.relation-property.types.ts"
import type { SelectOptionValue } from "akasha/page/select-property/properties/select-option-value.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type SelectOptionColors = List<{
  value: SelectOptionValue
  color: SelectOptionColor
}>
