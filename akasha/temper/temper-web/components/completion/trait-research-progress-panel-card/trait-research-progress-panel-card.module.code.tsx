import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { CharacterCardId } from "@akasha/temper-player-completion/completion-card-registry"
import type {
  CharacterTraitResearchProgress,
  CompletionCharacter,
} from "@akasha/temper-player-completion/completion-ui-types"
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

interface TraitResearchProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

interface AggregatedTrait {
  traitIndex: number
  name: string
  count: number
  total: number
}

interface AggregatedLine {
  name: string
  traits: readonly AggregatedTrait[]
}

interface AggregatedCraftType {
  name: string
  lines: readonly AggregatedLine[]
}

function singleCharacterCraftTypes(
  progress: CharacterTraitResearchProgress
): readonly AggregatedCraftType[] {
  return progress.craftTypes.map((ct) => ({
    name: ct.name,
    lines: ct.lines.map((line) => ({
      name: line.name,
      traits: line.traits.map((trait) => ({
        traitIndex: trait.traitIndex,
        name: trait.name,
        count: trait.known ? 1 : 0,
        total: 1,
      })),
    })),
  }))
}

function aggregateCraftTypes(
  progressEntries: readonly CharacterTraitResearchProgress[]
): readonly AggregatedCraftType[] {
  const craftMap = new Map<
    string,
    {
      lines: Map<
        string,
        {
          traitMap: Map<number, { name: string; knownSum: number; count: number }>
        }
      >
    }
  >()
  const orderedNames: string[] = []

  for (const p of progressEntries) {
    for (const ct of p.craftTypes) {
      let agg = craftMap.get(ct.name)
      if (!agg) {
        agg = { lines: new Map() }
        craftMap.set(ct.name, agg)
        orderedNames.push(ct.name)
      }
      for (const line of ct.lines) {
        let lineAgg = agg.lines.get(line.name)
        if (!lineAgg) {
          lineAgg = { traitMap: new Map() }
          agg.lines.set(line.name, lineAgg)
        }

        for (const trait of line.traits) {
          let traitAgg = lineAgg.traitMap.get(trait.traitIndex)
          if (!traitAgg) {
            traitAgg = { name: trait.name, knownSum: 0, count: 0 }
            lineAgg.traitMap.set(trait.traitIndex, traitAgg)
          }
          traitAgg.count++
          if (trait.known) traitAgg.knownSum++
        }
      }
    }
  }

  return orderedNames.map((name) => {
    const agg = requireGet(craftMap, name, "craftMap")
    const lines: AggregatedLine[] = []
    for (const [lineName, lineAgg] of agg.lines) {
      const traits: AggregatedTrait[] = []
      for (const [traitIndex, traitAgg] of lineAgg.traitMap) {
        traits.push({
          traitIndex,
          name: traitAgg.name,
          count: traitAgg.knownSum,
          total: traitAgg.count,
        })
      }
      traits.sort((a, b) => a.traitIndex - b.traitIndex)
      lines.push({ name: lineName, traits })
    }

    return { name, lines }
  })
}

function buildTraitKnownLookup(
  progressEntries: readonly CharacterTraitResearchProgress[]
): Map<string, Map<string, Map<number, boolean>>> {
  const lookup = new Map<string, Map<string, Map<number, boolean>>>()
  for (const p of progressEntries) {
    const charMap = new Map<string, Map<number, boolean>>()
    for (const ct of p.craftTypes) {
      for (const line of ct.lines) {
        const lineKey = `${ct.name}/${line.name}`
        const traitMap = new Map<number, boolean>()
        for (const trait of line.traits) {
          traitMap.set(trait.traitIndex, trait.known)
        }
        charMap.set(lineKey, traitMap)
      }
    }
    lookup.set(p.characterId, charMap)
  }
  return lookup
}

export function TraitResearchProgressPanelCard({
  id,
  characters,
  traitResearchProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: TraitResearchProgressPanelCardProps) {
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? traitResearchProgress
    : traitResearchProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const isSingle = selectedProgress.length === 1
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && !isSingle) {
    const craftTypes = aggregateCraftTypes(selectedProgress)
    const knownLookup = buildTraitKnownLookup(selectedProgress)
    const charNames = new Map(characters.map((c) => [c.id, c.name]))

    const items: CompletionNode[] = craftTypes.map((ct) => ({
      key: ct.name,
      label: ct.name,
      children: ct.lines.map(
        (line): CompletionNode => ({
          key: line.name,
          label: line.name,
          children: line.traits.map(
            (trait): CompletionNode => ({
              key: String(trait.traitIndex),
              label: trait.name,
              children: selectedProgress.map(
                (cp): CompletionNode => ({
                  key: cp.characterId,
                  label: charNames.get(cp.characterId) ?? cp.characterId,
                  count:
                    knownLookup
                      .get(cp.characterId)
                      ?.get(`${ct.name}/${line.name}`)
                      ?.get(trait.traitIndex) === true
                      ? 1
                      : 0,
                  total: 1,
                })
              ),
            })
          ),
        })
      ),
    }))

    const totalChildren: CompletionNode[] = selectedProgress.map((p) => {
      let count = 0
      let total = 0
      for (const ct of p.craftTypes) {
        for (const line of ct.lines) {
          total += line.traits.length
          for (const trait of line.traits) {
            if (trait.known) count++
          }
        }
      }
      return {
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Crafting Traits"
        items={withActivityCategories(items, "crafting")}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const craftTypes = isSingle
    ? singleCharacterCraftTypes(requireFirst(selectedProgress))
    : aggregateCraftTypes(selectedProgress)

  const items: CompletionNode[] = craftTypes.map((ct) => ({
    key: ct.name,
    label: ct.name,
    children: ct.lines.map(
      (line): CompletionNode => ({
        key: line.name,
        label: line.name,
        children: line.traits.map(
          (trait): CompletionNode => ({
            key: String(trait.traitIndex),
            label: trait.name,
            count: trait.count,
            total: trait.total,
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
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
