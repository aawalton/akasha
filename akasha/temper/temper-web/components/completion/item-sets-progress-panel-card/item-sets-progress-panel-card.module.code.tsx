import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import { SET_SUBCATEGORY_TO_ACTIVITY } from "@akasha/temper-player-completion/activity-category-mapping"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type {
  ItemSetOverallProgress,
  ItemSetSubcategoryProgress,
} from "@akasha/temper-player-completion/completion-item-set-progress"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface ItemSetsProgressPanelCardProps {
  id?: AccountCardId
  itemSetProgress: ItemSetOverallProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function ItemSetsProgressPanelCard({
  id,
  itemSetProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: ItemSetsProgressPanelCardProps) {
  function makeSetNode(
    set: ItemSetOverallProgress["categories"][number]["subcategories"][number]["sets"][number]
  ): CompletionNode {
    return set.pieces.length > 0
      ? {
          key: String(set.esoSetId),
          label: set.name,
          children: set.pieces.map(
            (piece, i): CompletionNode => ({
              key: String(i),
              label: piece.name,
              count: piece.unlocked ? 1 : 0,
              total: 1,
            })
          ),
        }
      : {
          key: String(set.esoSetId),
          label: set.name,
          count: set.slotsUnlocked,
          total: set.totalSlots,
        }
  }

  function makeSubcategoryNode(sub: ItemSetSubcategoryProgress): CompletionNode {
    return {
      key: sub.name,
      label: sub.name,
      children: sub.children
        ? sub.children.map((child) => makeSubcategoryNode(child))
        : sub.sets.map(makeSetNode),
    }
  }

  const items: CompletionNode[] = itemSetProgress.categories.map((category) => {
    const activity = SET_SUBCATEGORY_TO_ACTIVITY[category.categoryId] ?? "other"

    const onlySubcategory =
      category.subcategories.length === 1 ? category.subcategories[0] : undefined
    const skipSubcategoryLayer = onlySubcategory && onlySubcategory.name === category.name

    const children: CompletionNode[] =
      skipSubcategoryLayer && onlySubcategory
        ? onlySubcategory.sets.map(makeSetNode)
        : category.subcategories.map((sub) => makeSubcategoryNode(sub))

    return {
      key: String(category.categoryId),
      label: category.name,
      activityCategories: [activity],
      children: withActivityCategories(children, activity),
    }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Item Sets"
      items={items}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
