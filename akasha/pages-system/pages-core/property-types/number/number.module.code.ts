import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { parseConfig } from "../../schema/pages/pages.module.code.ts"
import {
  type NumberFormat,
  numberConfigSchema,
} from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export function toNumber(value: PropertyValue): number | null {
  if (value === null || value === undefined || value === "") return null
  const n = Number(value)
  return Number.isNaN(n) ? null : n
}

export interface NumberDisplayConfig {
  readonly format: NumberFormat
  readonly decimals?: number
  readonly percentBasis?: 1 | 100
  readonly round?: "floor" | "ceil"
}

const SHORT_SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx"] as const

function withMagnitudeSuffix(abs: number): string {
  let tier = 0
  let mantissa = abs
  while (mantissa >= 1000 && tier < SHORT_SUFFIXES.length - 1) {
    mantissa /= 1000
    tier++
  }
  const digits = mantissa >= 100 ? 0 : mantissa >= 10 ? 1 : 2
  let str = mantissa.toFixed(digits)
  if (Number.parseFloat(str) >= 1000 && tier < SHORT_SUFFIXES.length - 1) {
    tier++
    str = (Number.parseFloat(str) / 1000).toFixed(2)
  }
  return `${str}${SHORT_SUFFIXES[tier]}`
}

export function formatShortNumber(n: number): string {
  if (!Number.isFinite(n)) return "0"
  const sign = n < 0 ? "-" : ""
  const abs = Math.abs(n)
  if (abs < 1000) {
    if (Number.isInteger(abs)) return `${sign}${abs.toString()}`
    const rounded = Number.parseFloat(abs.toPrecision(3))
    if (rounded >= 1000) return `${sign}${withMagnitudeSuffix(rounded)}`
    return `${sign}${rounded.toString()}`
  }
  return `${sign}${withMagnitudeSuffix(abs)}`
}

function snapRound(
  n: number,
  decimals: number | undefined,
  round: "floor" | "ceil" | undefined
): number {
  if (round === undefined) return n
  const factor = 10 ** (decimals ?? 0)
  const snapped = round === "floor" ? Math.floor(n * factor) : Math.ceil(n * factor)
  return snapped / factor
}

export function formatPropertyNumber(n: number, config: NumberDisplayConfig): string {
  switch (config.format) {
    case "number": {
      const v = snapRound(n, config.decimals, config.round)
      return config.decimals === undefined ? String(v) : v.toFixed(config.decimals)
    }
    case "number-with-separators": {
      const v = snapRound(n, config.decimals, config.round)
      return config.decimals === undefined
        ? v.toLocaleString()
        : v.toLocaleString(undefined, {
            minimumFractionDigits: config.decimals,
            maximumFractionDigits: config.decimals,
          })
    }
    case "percent": {
      const decimals = config.decimals ?? 2
      const basis = config.percentBasis ?? 100
      return new Intl.NumberFormat(undefined, {
        style: "percent",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n / basis)
    }
    case "compact": {
      const v = snapRound(n, config.decimals, config.round)
      return new Intl.NumberFormat(undefined, {
        notation: "compact",
        ...(config.decimals === undefined ? {} : { maximumFractionDigits: config.decimals }),
      }).format(v)
    }
    case "short":
      return formatShortNumber(n)
    default:
      assertNever(config.format)
  }
}

export const NUMBER_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, definition: PropertyDefinition) {
    if (value === null || value === undefined || value === "") return null
    const n = Number(value)
    if (Number.isNaN(n)) return "Must be a number"
    const config = parseConfig(numberConfigSchema, definition.config, { format: "number" })
    if (config?.min !== undefined && n < config.min) return `Must be at least ${config.min}`
    if (config?.max !== undefined && n > config.max) return `Must be at most ${config.max}`
    return null
  },

  getSortValue(value: PropertyValue) {
    return toNumber(value)
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "equals", label: "=" },
      { value: "not_equals", label: "\u2260" },
      { value: "gt", label: ">" },
      { value: "lt", label: "<" },
      { value: "gte", label: "\u2265" },
      { value: "lte", label: "\u2264" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const filterNum = toNumber(config.value ?? null)
    const filterRaw = config.value
    const strictFilterIsNumber = typeof filterRaw === "number" && !Number.isNaN(filterRaw)

    return (value) => {
      const n = toNumber(value)
      switch (config.operator) {
        case "equals": {
          if (filterRaw === null || filterRaw === undefined) {
            return n === null && filterNum === null
          }
          if (!strictFilterIsNumber) return false
          return typeof value === "number" && !Number.isNaN(value) && value === filterRaw
        }
        case "not_equals": {
          if (filterRaw === null || filterRaw === undefined) {
            return !(n === null && filterNum === null)
          }
          if (!strictFilterIsNumber) return true
          return !(typeof value === "number" && !Number.isNaN(value) && value === filterRaw)
        }
        case "gt":
          return n !== null && filterNum !== null && n > filterNum
        case "lt":
          return n !== null && filterNum !== null && n < filterNum
        case "gte":
          return n !== null && filterNum !== null && n >= filterNum
        case "lte":
          return n !== null && filterNum !== null && n <= filterNum
        case "is_empty":
          return n === null
        case "is_not_empty":
          return n !== null
        default:
          return true
      }
    }
  },
}
