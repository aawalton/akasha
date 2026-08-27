import { assertNever } from "../../../utils-narrow/src/assert-never"
import type { AggregateFilter } from "../schema/property-config-schemas"
import type { PageDataJSON } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"

export function matchesAggregateFilter(data: PageDataJSON, filter: AggregateFilter): boolean {
  switch (filter.op) {
    case "and":
      return filter.filters.every((f) => matchesAggregateFilter(data, f))
    case "or":
      return filter.filters.some((f) => matchesAggregateFilter(data, f))
    case "in": {
      const v = data[filter.property]
      return typeof v === "string" && filter.values.includes(v)
    }
    case "eq":
      return data[filter.property] === filter.value
    case "is_null":
      return isNullish(data[filter.property])
    case "is_not_null":
      return !isNullish(data[filter.property])
    default:
      return assertNever(filter)
  }
}

function isNullish(value: ReadonlyJSONValue | undefined): boolean {
  if (value == null || value === "") return true
  return Array.isArray(value) && value.length === 0
}
