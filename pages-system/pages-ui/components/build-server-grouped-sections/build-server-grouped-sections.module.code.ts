import type { GroupGranularity } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { GROUP_NONE_KEY } from "@akasha/pages-core/view/apply-grouping-shared"
import { expandDateMentions } from "@akasha/pages-core/view/expand-date-mentions"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { toPageDataRecord } from "@akasha/pages-ui-components/page-data-json"
import type { ServerGroupedSection } from "@akasha/pages-ui-components/page-system-tab-content-props"
import { buildPageResolver } from "@akasha/pages-ui-components/view-engine/build-page-resolver"
import { getPageGroupDefinition } from "../view-engine/generate-group-definitions/generate-group-definitions.module.code.ts"

interface GroupedSource {
  pages: readonly PageWithProperties[]
  canLoadMore: boolean
  totalCount: number | null
}

export function buildServerGroupedSections({
  groupByPropertyId,
  properties,
  pageSets,
  groups,
  loadMore,
  groupGranularity,
}: {
  groupByPropertyId: string | undefined
  properties: readonly PropertyDefinition[]
  pageSets: readonly (readonly PageWithProperties[])[]
  groups: ReadonlyMap<string, GroupedSource>
  loadMore: (groupValue: string) => void
  groupGranularity?: GroupGranularity
}): readonly ServerGroupedSection[] | undefined {
  if (groupByPropertyId == null) return undefined
  const resolver = buildPageResolver(pageSets)
  const definition = getPageGroupDefinition(
    groupByPropertyId,
    properties,
    resolver,
    groupGranularity
  )
  const sections: ServerGroupedSection[] = []
  for (const [groupValue, groupData] of groups) {
    const named =
      definition?.getLabel(groupValue) ?? (groupValue === GROUP_NONE_KEY ? "No Value" : groupValue)
    const resolvedLabel = expandDateMentions(named)
    const label = resolvedLabel !== "" ? resolvedLabel : "Untitled"
    sections.push({
      key: groupValue,
      label,
      items: groupData.pages.map((p) => ({ ...toPageDataRecord(p.properties), _id: p._id })),
      canLoadMore: groupData.canLoadMore,
      loadMore: () => loadMore(groupValue),
      totalCount: groupData.totalCount,
    })
  }
  return sections
}
