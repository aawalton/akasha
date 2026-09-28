import {
  isPropertyPath,
  reachedIn,
  segmentsOf,
} from "akasha/page/core/filter/modules/property-path/property-path.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  FilterConfig,
  PropertyValue,
} from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { PROPERTY_TYPE_OPS_REGISTRY } from "akasha/page/core/property-type/modules/registry/registry.module.code.ts"
import { pageHasNonEmptyContentKey } from "akasha/page/core/schema/modules/content-tier/content-tier.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"

export type FilterableRow = Readonly<Record<string, ReadonlyJSONValue>>

type Row = Readonly<Record<string, ReadonlyJSONValue>>

type Reading = { readonly definition: PropertyDefinition } | { readonly refused: string }

const RELATIONS: ReadonlySet<string> = new Set(["relation", "multi-relation"])

const CONTENT_TESTS: ReadonlySet<string> = new Set(["is_empty", "is_not_empty"])

function toFilterConfig(filter: ViewFilter): FilterConfig {
  return {
    operator: filter.operator,
    value: filter.value,
  }
}

function asPropertyValue(value: unknown): PropertyValue {
  return value as PropertyValue
}

function reachedBy(key: string, properties: readonly PropertyDefinition[]): Reading {
  const [head = "", ...rest] = segmentsOf(key)
  const declared = properties.find((one) => one.id === head)
  if (declared === undefined) {
    return { refused: `\`${key}\` names \`${head}\`, which the page type declares nothing for` }
  }
  let definition: PropertyDefinition = declared
  for (const segment of rest) {
    if (RELATIONS.has(definition.type)) {
      return {
        refused: `\`${key}\` reaches through the relation \`${definition.id}\`, which is read on the pages it names before any filter runs`,
      }
    }
    const field = definition.fields?.find((one) => one.id === segment)
    if (field === undefined) {
      return {
        refused: `\`${key}\` names \`${segment}\` inside \`${definition.id}\`, which holds no such field`,
      }
    }
    definition = field
  }
  return { definition }
}

function readingOf(filter: ViewFilter, properties: readonly PropertyDefinition[]): Reading {
  const key = filter.propertyId
  const reached = reachedBy(key, properties)
  if ("refused" in reached) return reached
  const { definition } = reached
  if (definition.storage === "content" && !CONTENT_TESTS.has(filter.operator)) {
    return {
      refused: `\`${key}\` is held as content, which is tested for emptiness alone rather than by \`${filter.operator}\``,
    }
  }
  if (PROPERTY_TYPE_OPS_REGISTRY[definition.type] === undefined) {
    return { refused: `\`${key}\` is a ${definition.type} property, which no filter tests` }
  }
  return reached
}

function contentPredicate(filter: ViewFilter): (row: Row) => boolean {
  const key = filter.propertyId
  if (filter.operator === "is_not_empty") return (row) => pageHasNonEmptyContentKey(row, key)
  return (row) => !pageHasNonEmptyContentKey(row, key)
}

function predicateFor(
  filter: ViewFilter,
  properties: readonly PropertyDefinition[]
): (row: Row) => boolean {
  const reading = readingOf(filter, properties)
  if ("refused" in reading) {
    throw new Error(`a filter this page type cannot read is refused: ${reading.refused}`)
  }
  const { definition } = reading
  if (definition.storage === "content") return contentPredicate(filter)
  const valuePredicate = PROPERTY_TYPE_OPS_REGISTRY[definition.type].getFilterPredicate(
    toFilterConfig(filter),
    definition
  )
  const key = filter.propertyId
  if (!isPropertyPath(key)) return (row) => valuePredicate(row[key] ?? null)
  return (row) => {
    const values = reachedIn(row, key)
    if (values.length === 0) return valuePredicate(null)
    return values.some((one) => valuePredicate(asPropertyValue(one)))
  }
}

export function applyFilters<T extends FilterableRow>(
  items: readonly T[],
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[]
): readonly T[] {
  if (!filters || filters.length === 0) return items.slice()
  if (properties.length === 0) return items.slice()
  const predicates = filters.map((filter) => predicateFor(filter, properties))
  return items.filter((item) => predicates.every((predicate) => predicate(item)))
}
