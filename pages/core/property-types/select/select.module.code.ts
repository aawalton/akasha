import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { parseConfig } from "../../schema/pages/pages.module.code.ts"
import { selectConfigSchema } from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export interface OptionLike {
  readonly id: string
  readonly label: string
}

function getOptions(definition: PropertyDefinition): readonly OptionLike[] {
  return parseConfig(selectConfigSchema, definition.config, { options: [] }).options
}

export function findOption(options: readonly OptionLike[], id: string): OptionLike | undefined {
  return options.find((o) => o.id === id)
}

export const SELECT_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, definition: PropertyDefinition) {
    if (value == null || value === "") return null
    if (typeof value !== "string") return "Select value must be a string"
    const options = getOptions(definition)
    if (!findOption(options, value)) return "Invalid option"
    return null
  },

  getSortValue(value: PropertyValue, definition?: PropertyDefinition) {
    if (typeof value !== "string") return null
    if (definition?.sort === "alpha") {
      const options = getOptions(definition)
      return findOption(options, value)?.label ?? value
    }
    if (!definition) return value
    const options = getOptions(definition)
    const idx = options.findIndex((o) => o.id === value)
    return idx === -1 ? null : idx
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "includes", label: "Is any of" },
      { value: "not_includes", label: "Is none of" },
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      switch (operator) {
        case "equals":
          return value === filterValue
        case "not_equals":
          return value !== filterValue
        case "includes":
          if (filterValue === undefined) return true
          return Array.isArray(filterValue) && filterValue.includes(value)
        case "not_includes":
          if (filterValue === undefined) return true
          return Array.isArray(filterValue) && !filterValue.includes(value)
        case "is_empty":
          return value == null || value === ""
        case "is_not_empty":
          return value != null && value !== ""
        default:
          return true
      }
    }
  },
}
