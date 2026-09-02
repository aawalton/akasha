import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { AccountSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { CUMULATIVE_ACCOUNT_CARDS } from "@akasha/temper-player-completion/completion-cumulative-cards"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AccountSummaryPanelCardProps {
  summary: AccountSummaryData
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
  onItemClick?: (key: string) => void
  collapseProtected?: boolean
}

export function AccountSummaryPanelCard({
  summary,
  completionFilter,
  sortMode,
  sortDirection,
  onItemClick,
  collapseProtected,
}: AccountSummaryPanelCardProps) {
  const hasData = Object.values(summary).some((entry) => entry.total > 0)
  if (!hasData) return null

  const items: CompletionNode[] = CUMULATIVE_ACCOUNT_CARDS.map((card) => ({
    key: card.id,
    label: card.title,
    count: summary[card.id].count,
    total: summary[card.id].total,
  }))

  return (
    <CompletionPanelCard
      title="Account Summary"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
      onItemClick={onItemClick}
      collapseProtected={collapseProtected}
    />
  )
}
