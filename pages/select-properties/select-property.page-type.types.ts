import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { SelectValues } from "./properties/select-values.text-property.ts"

export type SelectProperty = PageProperty & {
  values: SelectValues
}
