import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { textFilterPredicate } from "akasha/page/core/property-type/modules/filter-utils/filter-utils.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import {
  getOptions,
  SELECT_OPS,
} from "akasha/page/core/property-type/modules/select/select.module.code.ts"

const AMONG: ReadonlySet<string> = new Set(["includes", "not_includes"])

function closed(definition: PropertyDefinition): boolean {
  return getOptions(definition).length > 0
}

export const TEXT_OPS: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    const str = String(value ?? "")
    return str !== "" ? str : null
  },

  getFilterOperators(definition: PropertyDefinition): readonly FilterOperatorOption[] {
    if (closed(definition)) return SELECT_OPS.getFilterOperators(definition)
    return [
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does not contain" },
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig, definition: PropertyDefinition) {
    if (AMONG.has(config.operator)) return SELECT_OPS.getFilterPredicate(config, definition)
    return textFilterPredicate(config)
  },
}
