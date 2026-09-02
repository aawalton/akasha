import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountTraitResearchUnionProgress } from "@akasha/temper-player-completion/completion-account-trait-union"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AccountTraitResearchPanelCardProps {
  id?: AccountCardId
  traitResearchUnion: AccountTraitResearchUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function AccountTraitResearchPanelCard({
  id,
  traitResearchUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountTraitResearchPanelCardProps) {
  const items: CompletionNode[] = traitResearchUnion.craftTypes.map((ct) => ({
    key: String(ct.craftingType),
    label: ct.name,
    children: ct.lines.map(
      (line): CompletionNode => ({
        key: String(line.researchLineIndex),
        label: line.name,
        children: line.traits.map(
          (trait): CompletionNode => ({
            key: String(trait.traitIndex),
            label: trait.name,
            count: trait.known ? 1 : 0,
            total: 1,
          })
        ),
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Crafting Traits"
      items={withActivityCategories(items, "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
