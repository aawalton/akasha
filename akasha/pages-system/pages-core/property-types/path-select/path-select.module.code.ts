import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { parseConfig } from "../../schema/pages/pages.module.code.ts"
import { pathSelectConfigSchema } from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

const DEFAULT_SEPARATOR = " > "

type PathSegment = string | number

function isPathSegment(value: unknown): value is PathSegment {
  return typeof value === "string" || typeof value === "number"
}

function getValueArray(value: PropertyValue): readonly PathSegment[] {
  if (!Array.isArray(value)) return []
  return value.filter(isPathSegment)
}

function getSeparator(definition: PropertyDefinition | undefined): string {
  if (!definition) return DEFAULT_SEPARATOR
  return (
    parseConfig(pathSelectConfigSchema, definition.config, { providerId: "" }).separator ??
    DEFAULT_SEPARATOR
  )
}

export const PATH_SELECT_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, definition: PropertyDefinition) {
    if (value == null) return null
    if (!Array.isArray(value)) return "path-select value must be an array"
    for (const seg of value) {
      if (typeof seg !== "string" && typeof seg !== "number") {
        return "path-select segments must be strings or numbers"
      }
    }
    const c = parseConfig(pathSelectConfigSchema, definition.config, { providerId: "" })
    if (c.requiredDepth !== undefined && value.length < c.requiredDepth) {
      return `Path must have at least ${c.requiredDepth} segments`
    }
    if (c.maxDepth !== undefined && value.length > c.maxDepth) {
      return `Path must have at most ${c.maxDepth} segments`
    }
    return null
  },

  getSortValue(value: PropertyValue, definition?: PropertyDefinition) {
    const segments = getValueArray(value)
    if (segments.length === 0) return null
    return segments.map(String).join(getSeparator(definition))
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "path_starts_with", label: "Path starts with" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const { operator, value: filterValue } = config
    return (value: PropertyValue) => {
      const segments = getValueArray(value)
      switch (operator) {
        case "path_starts_with": {
          if (!Array.isArray(filterValue)) return true
          const prefix = filterValue.filter(isPathSegment)
          if (prefix.length === 0) return segments.length > 0
          if (prefix.length > segments.length) return false
          return prefix.every((seg, i) => segments[i] === seg)
        }
        case "is_empty":
          return segments.length === 0
        case "is_not_empty":
          return segments.length > 0
        default:
          return true
      }
    }
  },
}
