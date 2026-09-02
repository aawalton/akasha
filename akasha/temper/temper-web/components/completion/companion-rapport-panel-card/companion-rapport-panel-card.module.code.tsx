import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { MAX_COMPANION_RAPPORT } from "@akasha/temper-player-completion/companion-rapport"
import type { CompanionCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type { CompanionProgressEntry } from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface CompanionRapportPanelCardProps {
  id?: CompanionCardId
  companionProgress: readonly CompanionProgressEntry[]
  selectedCompanionIds: readonly string[]
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionRapportPanelCard({
  id,
  companionProgress,
  selectedCompanionIds,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionRapportPanelCardProps) {
  if (companionProgress.length === 0) return null

  const isAggregate = selectedCompanionIds.length === 0
  const filtered = isAggregate
    ? companionProgress
    : companionProgress.filter((c) => selectedCompanionIds.includes(c.companionId))

  const companionNodes: CompletionNode[] = filtered.map((c) => ({
    key: c.companionId,
    label: c.name,
    count: c.rapport,
    total: MAX_COMPANION_RAPPORT,
  }))

  const items: CompletionNode[] = [{ key: "rapport", label: "Rapport", children: companionNodes }]

  return (
    <CompletionPanelCard
      id={id}
      title="Companion Rapport"
      items={withActivityCategories(items, "companions")}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
