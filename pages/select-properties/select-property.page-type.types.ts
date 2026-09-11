import type { SelectValues } from "akasha/pages/select-properties/properties/select-values.text-property.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type SelectProperty = PageProperty & {
  values: SelectValues
}
