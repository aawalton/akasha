import { isRecord } from "@akasha/utils-narrow/is-record"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "../../schema/pages/pages.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

function isFiniteNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
}

function validateEntryShape(entry: unknown): string | null {
  if (!isRecord(entry)) return "entry must be an object"
  if (!isFiniteNonNegativeNumber(entry.current))
    return "entry.current must be a finite non-negative number"
  if (!isFiniteNonNegativeNumber(entry.total))
    return "entry.total must be a finite non-negative number"
  if (!isFiniteNonNegativeNumber(entry.sortOrder)) {
    return "entry.sortOrder must be a finite non-negative number"
  }
  if (entry.label !== undefined && typeof entry.label !== "string") {
    return "entry.label must be a string"
  }
  if (entry.href !== undefined) {
    if (typeof entry.href !== "string") return "entry.href must be a string"
    if (entry.href === "") return "entry.href must be a non-empty string"
  }
  return null
}

export function validateProgressValue(value: ReadonlyJSONValue | undefined): string | null {
  if (value === null || value === undefined || value === "") return null
  if (!isRecord(value)) return "Progress value must be an object"
  if (!isFiniteNonNegativeNumber(value.current)) {
    return "Progress current must be a finite non-negative number"
  }
  if (!isFiniteNonNegativeNumber(value.total)) {
    return "Progress total must be a finite non-negative number"
  }

  const topCurrent = value.current
  const topTotal = value.total
  const entries = value.entries
  const activeEntryKey = value.activeEntryKey

  if (entries === undefined) {
    if (activeEntryKey !== undefined) return "activeEntryKey requires entries"
    return null
  }

  if (!isRecord(entries)) return "Progress entries must be an object"

  for (const [key, entry] of Object.entries(entries)) {
    const err = validateEntryShape(entry)
    if (err !== null) return `Progress entry "${key}": ${err}`
  }

  if (activeEntryKey !== undefined) {
    if (typeof activeEntryKey !== "string") return "activeEntryKey must be a string"
    const active = entries[activeEntryKey]
    if (active === undefined) {
      return `activeEntryKey "${activeEntryKey}" does not reference an existing entry`
    }
    if (!isRecord(active)) return `entry "${activeEntryKey}" is not an object`
    if (active.current !== topCurrent || active.total !== topTotal) {
      return "Active entry must mirror top-level current/total"
    }
  } else {
    for (const [key, entry] of Object.entries(entries)) {
      if (!isRecord(entry)) return `entry "${key}" is not an object`
      if (entry.current !== entry.total) {
        return `Without activeEntryKey, every entry must be complete (entry "${key}" is not)`
      }
    }
  }

  return null
}

function asProgressScalar(value: PropertyValue): { current: number; total: number } | null {
  if (!isRecord(value)) return null
  const { current, total } = value
  if (typeof current !== "number" || typeof total !== "number") return null
  return { current, total }
}

export const PROGRESS_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, _definition: PropertyDefinition) {
    return validateProgressValue(value)
  },

  getSortValue(value: PropertyValue) {
    const v = asProgressScalar(value)
    if (v === null || v.total <= 0) return null
    return v.current / v.total
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_complete", label: "Is complete" },
      { value: "is_incomplete", label: "Is incomplete" },
      { value: "gte_percent", label: "≥ %" },
      { value: "lte_percent", label: "≤ %" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return (value) => {
      const v = asProgressScalar(value)
      switch (config.operator) {
        case "is_empty":
          return v === null
        case "is_not_empty":
          return v !== null
        case "is_complete":
          return v !== null && v.total > 0 && v.current >= v.total
        case "is_incomplete":
          return v !== null && v.total > 0 && v.current < v.total
        case "gte_percent": {
          if (v === null || v.total <= 0) return false
          const filterValue = config.value
          if (typeof filterValue !== "number" || !Number.isFinite(filterValue)) return false
          return (v.current / v.total) * 100 >= filterValue
        }
        case "lte_percent": {
          if (v === null || v.total <= 0) return false
          const filterValue = config.value
          if (typeof filterValue !== "number" || !Number.isFinite(filterValue)) return false
          return (v.current / v.total) * 100 <= filterValue
        }
        default:
          return true
      }
    }
  },
}
