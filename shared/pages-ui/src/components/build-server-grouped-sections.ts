import { type GroupGranularity } from "@shared/pages-core/schema/view-data"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { expandDateMentions } from "@shared/pages-core/view/expand-date-mentions"
import type { PageWithProperties } from "../supabase/types"
import { buildPageResolver } from "../view-engine/build-page-resolver"
import { getPageGroupDefinition } from "../view-engine/generate-group-definitions"
import { toPageDataRecord } from "./page-data-json"
import type { ServerGroupedSection } from "./page-system-view-types"

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
    const resolvedLabel = expandDateMentions(definition?.getLabel(groupValue) ?? groupValue)
    const label = resolvedLabel !== "" ? resolvedLabel : groupValue === "" ? "No Value" : "Untitled"
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
