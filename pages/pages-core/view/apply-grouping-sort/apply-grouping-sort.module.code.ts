import { nullOrderSign } from "../../null-ordering/null-ordering.module.code.ts"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { ViewSort } from "../../schema/view-data/view-data.module.code.ts"
import {
  compareGroupLabels,
  effectiveGroupable,
  GROUP_NONE_KEY,
  type GroupedResult,
  type GroupSortOption,
  getOptions,
  type PageResolver,
} from "../apply-grouping-shared/apply-grouping-shared.module.code.ts"

export function generateGroupSortOptions(
  groupBy: string,
  properties: readonly PropertyDefinition[]
): readonly GroupSortOption[] {
  const prop = properties.find((p) => p.id === groupBy)
  if (!prop || !effectiveGroupable(prop)) return []

  const options: GroupSortOption[] = []
  if (
    prop.type === "select" ||
    prop.type === "multi-select" ||
    prop.type === "relation" ||
    prop.type === "multi-relation"
  ) {
    options.push({ value: groupBy, label: prop.title, defaultDirection: "asc" })
  }
  options.push({ value: "label", label: "Label", defaultDirection: "asc" })
  options.push({ value: "count", label: "Count", defaultDirection: "desc" })

  return options
}

export function getDefaultGroupSorts(
  groupBy: string,
  properties: readonly PropertyDefinition[]
): readonly ViewSort[] {
  const prop = properties.find((p) => p.id === groupBy)
  if (!prop || !effectiveGroupable(prop)) return []

  if (
    prop.type === "select" ||
    prop.type === "multi-select" ||
    prop.type === "relation" ||
    prop.type === "multi-relation"
  ) {
    return [{ field: groupBy, direction: "asc" }]
  }
  return [{ field: "label", direction: "asc" }]
}

export function makeGroupKeyByPropertyComparator(
  prop: PropertyDefinition | undefined,
  resolver?: PageResolver | null
): (aKey: string, aLabel: string, bKey: string, bLabel: string) => number {
  const useOptionOrder =
    prop && (prop.type === "select" || prop.type === "multi-select") && prop.sort !== "alpha"
  const indexMap = useOptionOrder ? new Map(getOptions(prop).map((o, i) => [o.id, i])) : null
  const useTargetSortOrder =
    prop != null && (prop.type === "relation" || prop.type === "multi-relation") && resolver != null
  return (aKey, aLabel, bKey, bLabel) => {
    if (indexMap) {
      const aIdx = indexMap.get(aKey) ?? Number.MAX_SAFE_INTEGER
      const bIdx = indexMap.get(bKey) ?? Number.MAX_SAFE_INTEGER
      if (aIdx !== bIdx) return aIdx - bIdx
    }
    if (useTargetSortOrder) {
      const aOrder = resolver.resolve(aKey)?.sortOrder ?? Number.MAX_SAFE_INTEGER
      const bOrder = resolver.resolve(bKey)?.sortOrder ?? Number.MAX_SAFE_INTEGER
      if (aOrder !== bOrder) return aOrder - bOrder
    }
    return compareGroupLabels(aLabel, bLabel)
  }
}

export function sortGroupedResults<T extends GroupedResult>(
  groups: readonly T[],
  sorts: readonly ViewSort[],
  groupBy: string,
  properties: readonly PropertyDefinition[],
  resolver?: PageResolver | null
): readonly T[] {
  if (sorts.length === 0) return groups

  const normalizedSorts: ViewSort[] = []
  for (const s of sorts) {
    if (s.field === "defined-order") {
      if (groupBy !== "") normalizedSorts.push({ field: groupBy, direction: "asc" })
      continue
    }
    if (String(s.direction) === "manual") {
      normalizedSorts.push({ ...s, direction: "asc" })
      continue
    }
    normalizedSorts.push(s)
  }

  const prop = properties.find((p) => p.id === groupBy)
  const compareByGroupProp = makeGroupKeyByPropertyComparator(prop, resolver)

  const primaryDesc = normalizedSorts[0]?.direction === "desc"

  const result = [...groups]
  result.sort((a, b) => {
    const aEmpty = a.key === GROUP_NONE_KEY
    const bEmpty = b.key === GROUP_NONE_KEY
    if (aEmpty !== bEmpty) return nullOrderSign(aEmpty, primaryDesc)

    for (const { field, direction } of normalizedSorts) {
      let cmp = 0

      if (field === "label") {
        cmp = compareGroupLabels(a.label, b.label)
      } else if (field === "count") {
        cmp = a.items.length - b.items.length
      } else if (field === groupBy) {
        cmp = compareByGroupProp(a.key, a.label, b.key, b.label)
      }

      if (cmp !== 0) return direction === "asc" ? cmp : -cmp
    }
    return 0
  })
  return result
}
