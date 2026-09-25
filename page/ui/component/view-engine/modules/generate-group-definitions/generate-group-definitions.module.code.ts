import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { GroupGranularity } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { getPageGroupDefinition as coreGetPageGroupDefinition } from "akasha/page/core/view/modules/apply-grouping/apply-grouping.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import type { PageResolverValue } from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"

interface PageGroupDefinition {
  getKey: (item: PageRow) => string
  getKeys?: (item: PageRow) => readonly string[]
  getLabel: (key: string) => string
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
