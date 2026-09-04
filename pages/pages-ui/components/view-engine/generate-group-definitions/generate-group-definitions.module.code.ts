import type { GroupGranularity } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { getPageGroupDefinition as coreGetPageGroupDefinition } from "@akasha/pages-core/view/apply-grouping"
import type { PageResolverValue } from "@akasha/pages-ui/contexts/page-resolver-context"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"

export interface PageGroupDefinition {
  getKey: (item: PageRow) => string
  getKeys?: (item: PageRow) => readonly string[]
  getLabel: (key: string) => string
}

export interface GroupedResult {
  key: string
  label: string
  items: readonly PageRow[]
}

export function getPageGroupDefinition(
  groupBy: string,
  properties: readonly PropertyDefinition[],
  resolver?: PageResolverValue | null,
  granularity?: GroupGranularity
): PageGroupDefinition | null {
  const coreResolver = resolver ? { resolve: resolver.resolve } : resolver
  const coreDef = coreGetPageGroupDefinition(groupBy, properties, coreResolver, granularity)
  if (coreDef === null) return null
  const getKeys = coreDef.getKeys
  return {
    getKey: (item: PageRow) => coreDef.getKey(item),
    ...(getKeys === undefined ? {} : { getKeys: (item: PageRow) => getKeys(item) }),
    getLabel: coreDef.getLabel,
  }
}
