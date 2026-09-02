import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type { AccountAntiquityLoreProgress } from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AntiquityLorePanelCardProps {
  id?: AccountCardId
  antiquityLoreProgress: AccountAntiquityLoreProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AntiquityLorePanelCard({
  id,
  antiquityLoreProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AntiquityLorePanelCardProps) {
  const items: CompletionNode[] = antiquityLoreProgress.categories.map((category) => ({
    key: String(category.categoryId),
    label: category.name,
    children: category.antiquities.map(
      (antiquity): CompletionNode => ({
        key: String(antiquity.antiquityId),
        label: antiquity.name,
        count: antiquity.loreEntriesAcquired,
        total: antiquity.totalLoreEntries,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Antiquity Lore"
      items={withActivityCategories(items, "exploration")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
