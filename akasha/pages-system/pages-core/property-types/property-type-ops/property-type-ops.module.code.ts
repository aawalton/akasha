import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "../../schema/pages/pages.module.code.ts"

export type PropertyValue = ReadonlyJSONValue | undefined

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "is_empty"
  | "is_not_empty"
  | "includes"
  | "not_includes"
  | "is_between"
  | "is_relative_to_today"
  | "path_starts_with"
  | "is_complete"
  | "is_incomplete"
  | "gte_percent"
  | "lte_percent"

export interface FilterConfig {
  readonly operator: FilterOperator | (string & {})
  readonly value?: ReadonlyJSONValue
}

export interface FilterOperatorOption {
  readonly value: FilterOperator
  readonly label: string
}

export interface PropertyTypeOps {
  readonly rendersWhenEmpty?: boolean
  validate: (value: PropertyValue, definition: PropertyDefinition) => string | null
  getSortValue: (value: PropertyValue, definition?: PropertyDefinition) => string | number | null
  getFilterOperators: (definition: PropertyDefinition) => readonly FilterOperatorOption[]
  getFilterPredicate: (
    config: FilterConfig,
    definition: PropertyDefinition
  ) => (value: PropertyValue) => boolean
}
