import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { CompanionCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type { CompanionSkillLineProgress } from "@akasha/temper-player-completion/completion-ui-types"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { requireGet } from "@akasha/utils-narrow/require-get"

interface CompanionSkillLinesProgressPanelCardProps {
  id?: CompanionCardId
  companionSkillLineProgress: readonly CompanionSkillLineProgress[]
  selectedCompanionIds: readonly string[]
  completionFilter?: CompletionFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function CompanionSkillLinesProgressPanelCard({
  id,
  companionSkillLineProgress,
  selectedCompanionIds,
  completionFilter,
  sortMode,
  sortDirection,
}: CompanionSkillLinesProgressPanelCardProps) {
  if (companionSkillLineProgress.length === 0) return null

  const isAggregate = selectedCompanionIds.length === 0
  const filtered = isAggregate
    ? companionSkillLineProgress
    : companionSkillLineProgress.filter((c) => selectedCompanionIds.includes(c.companionId))

  let items: CompletionNode[]

  if (isAggregate) {
    const skillLineOrder: string[] = []
    const skillLineNames = new Map<string, string>()
    const rankLookup = new Map<string, Map<string, { currentRank: number; maxRank: number }>>()

    for (const companion of filtered) {
      for (const entry of companion.entries) {
        if (!skillLineNames.has(entry.skillLineId)) {
          skillLineOrder.push(entry.skillLineId)
          skillLineNames.set(entry.skillLineId, entry.name)
        }
        let slMap = rankLookup.get(entry.skillLineId)
        if (!slMap) {
          slMap = new Map()
          rankLookup.set(entry.skillLineId, slMap)
        }
        slMap.set(companion.companionId, {
          currentRank: entry.currentRank,
          maxRank: entry.maxRank,
        })
      }
    }

    items = skillLineOrder.map((slId) => ({
      key: slId,
      label: requireGet(skillLineNames, slId, "skillLineNames"),
      children: filtered.map(
        (companion): CompletionNode => ({
          key: companion.companionId,
          label: companion.name,
          count: rankLookup.get(slId)?.get(companion.companionId)?.currentRank ?? 0,
          total: rankLookup.get(slId)?.get(companion.companionId)?.maxRank ?? 0,
        })
      ),
    }))
  } else if (filtered.length === 1) {
    items = requireFirst(filtered).entries.map((entry) => ({
      key: entry.skillLineId,
      label: entry.name,
      count: entry.currentRank,
      total: entry.maxRank,
    }))
  } else {
    items = filtered.map((companion) => ({
      key: companion.companionId,
      label: companion.name,
      children: companion.entries.map(
        (entry): CompletionNode => ({
          key: entry.skillLineId,
          label: entry.name,
          count: entry.currentRank,
          total: entry.maxRank,
        })
      ),
    }))
  }

  return (
    <CompletionPanelCard
      id={id}
      title="Companion Skill Lines"
      items={withActivityCategories(items, "companions")}
      filterNode={createNodeFilter(completionFilter ?? [], undefined)}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
