import type { PropertyDefinition } from "@akasha/pages-core/types"
import { getPageGroupDefinition } from "@akasha/pages-core/view/apply-grouping"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"

export interface CardGroupSection {
  readonly key: string
  readonly label: string
  readonly items: readonly PageRow[]
}

export function bucketPageRowsByGroup(
  rows: readonly PageRow[],
  groupBy: string,
  properties: readonly PropertyDefinition[]
): readonly CardGroupSection[] | undefined {
  const definition = getPageGroupDefinition(groupBy, properties)
  if (definition === null) {
    return undefined
  }
  const order: string[] = []
  const buckets = new Map<string, PageRow[]>()
  for (const row of rows) {
    const keys = definition.getKeys ? definition.getKeys(row) : [definition.getKey(row)]
    for (const key of keys) {
      const bucket = buckets.get(key)
      if (bucket) {
        bucket.push(row)
      } else {
        buckets.set(key, [row])
        order.push(key)
      }
    }
  }
  return order.map((key) => ({
    key,
    label: definition.getLabel(key),
    items: buckets.get(key) ?? [],
  }))
}
