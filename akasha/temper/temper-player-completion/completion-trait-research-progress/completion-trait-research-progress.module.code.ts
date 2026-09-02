import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterTraitResearchProgress,
  TraitResearchCraftTypeProgress,
  TraitResearchLineEntry,
  TraitResearchTraitEntry,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface TraitResearchCatalogTrait {
  traitIndex: number
  traitName: string
}

export interface TraitResearchCatalogLine {
  slug: string
  title: string
  displayOrder: number
  parent: string
  traits: readonly TraitResearchCatalogTrait[]
}

export interface TraitResearchCatalogCraftType {
  slug: string
  title: string
  esoCraftTypeId: number
}

type TraitResearch = NonNullable<CharacterCompletion["traitResearch"]>
type ItemPath = readonly (string | number)[]

function traitKey(craftTypeId: number, lineIndex: number, traitName: string): string {
  return `${craftTypeId}:${lineIndex}:${traitName.toLowerCase()}`
}

function traitResearchKnownSet(traitResearch: TraitResearch | null | undefined): Set<string> {
  const knownSet = new Set<string>()
  if (!traitResearch) return knownSet

  for (const [craftKey, craftType] of Object.entries(traitResearch)) {
    const craftTypeId = Number(craftKey)
    for (const [lineKey, line] of Object.entries(craftType.lines)) {
      const lineIndex = Number(lineKey)
      for (const trait of Object.values(line.traits)) {
        if (trait.known) knownSet.add(traitKey(craftTypeId, lineIndex, trait.name))
      }
    }
  }

  return knownSet
}

function craftTypesInOrder(
  craftTypes: readonly TraitResearchCatalogCraftType[]
): readonly TraitResearchCatalogCraftType[] {
  return [...craftTypes].sort((a, b) => a.esoCraftTypeId - b.esoCraftTypeId)
}

function linesUnder(
  craftType: TraitResearchCatalogCraftType,
  researchLines: readonly TraitResearchCatalogLine[]
): readonly TraitResearchCatalogLine[] {
  return researchLines
    .filter((line) => line.parent === craftType.slug)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

function countTraitResearch(
  traitResearch: TraitResearch | null | undefined,
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[],
  itemPath?: ItemPath
): { current: number; total: number } {
  const knownSet = traitResearchKnownSet(traitResearch)
  const craftFilter = itemPath?.[0] !== undefined ? Number(itemPath[0]) : null
  const lineFilter = itemPath?.[1] !== undefined ? Number(itemPath[1]) : null
  const traitFilter = itemPath?.[2] !== undefined ? Number(itemPath[2]) : null

  let current = 0
  let total = 0
  for (const craft of craftTypesInOrder(craftTypes)) {
    if (craftFilter !== null && craft.esoCraftTypeId !== craftFilter) continue
    for (const line of linesUnder(craft, researchLines)) {
      if (lineFilter !== null && line.displayOrder !== lineFilter) continue
      for (const trait of line.traits) {
        if (traitFilter !== null && trait.traitIndex !== traitFilter) continue
        total++
        if (knownSet.has(traitKey(craft.esoCraftTypeId, line.displayOrder, trait.traitName))) {
          current++
        }
      }
    }
  }
  return { current, total }
}

export function isTraitResearchCardComplete(
  completion: CharacterCompletion | null,
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[]
): boolean {
  if (!completion) return false
  const { current, total } = countTraitResearch(completion.traitResearch, craftTypes, researchLines)
  return total > 0 && current === total
}

export function isTraitResearchItemComplete(
  completion: CharacterCompletion | null,
  itemPath: ItemPath,
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[]
): boolean {
  if (!completion || itemPath.length === 0) return false
  const { current, total } = countTraitResearch(
    completion.traitResearch,
    craftTypes,
    researchLines,
    itemPath
  )
  return total > 0 && current === total
}

function buildCraftTypes(
  knownSet: Set<string>,
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[]
): {
  craftTypes: readonly TraitResearchCraftTypeProgress[]
  knownCount: number
  totalCount: number
} {
  let totalKnown = 0
  let totalCount = 0

  const built = craftTypesInOrder(craftTypes).map((craft) => {
    let craftKnown = 0
    let craftTotal = 0

    const lines: TraitResearchLineEntry[] = linesUnder(craft, researchLines).map((line) => {
      const traits: TraitResearchTraitEntry[] = line.traits.map((trait) => ({
        traitIndex: trait.traitIndex,
        name: trait.traitName,
        known: knownSet.has(traitKey(craft.esoCraftTypeId, line.displayOrder, trait.traitName)),
      }))
      const lineKnown = traits.filter((t) => t.known).length
      craftKnown += lineKnown
      craftTotal += traits.length
      return {
        researchLineIndex: line.displayOrder,
        name: line.title,
        knownCount: lineKnown,
        totalCount: traits.length,
        traits,
      }
    })

    totalKnown += craftKnown
    totalCount += craftTotal
    return {
      craftingType: craft.esoCraftTypeId,
      name: craft.title,
      lines,
      knownCount: craftKnown,
      totalCount: craftTotal,
    }
  })

  return { craftTypes: built, knownCount: totalKnown, totalCount }
}

export function transformTraitResearchProgress(
  rows: readonly CompletionCharacterRow[],
  craftTypes: readonly TraitResearchCatalogCraftType[],
  researchLines: readonly TraitResearchCatalogLine[]
): readonly CharacterTraitResearchProgress[] {
  const result: CharacterTraitResearchProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!isCharacterMeasured(completion)) continue

    const built = buildCraftTypes(
      traitResearchKnownSet(completion?.traitResearch),
      craftTypes,
      researchLines
    )

    result.push({
      characterId: row.id,
      craftTypes: built.craftTypes,
      knownCount: built.knownCount,
      totalCount: built.totalCount,
    })
  }

  return result
}
