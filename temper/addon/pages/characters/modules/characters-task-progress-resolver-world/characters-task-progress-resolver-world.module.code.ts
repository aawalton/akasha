import { tallyPathScopedLeaves } from "akasha/temper/addon/pages/characters/modules/characters-progress-tally/characters-progress-tally.module.code.ts"
import { companionIdOfDefId } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-companion-rapport/characters-task-hud-companion-rapport.module.code.ts"
import { ALL_COMPANION_IDS } from "akasha/temper/addon/pages/characters/modules/companions-id-map/companions-id-map.module.code.ts"
import type { AccountCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { COMPANION_QUEST_DATA } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import {
  heldCompanionRapport,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import { hasCompanionQuestLeft } from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-actionability/completion-companion-quest-actionability.module.code.ts"
import { countLoreLibrary } from "akasha/temper/player/completion/temper-player-completion/modules/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import type { SavedCharacterEntry } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import type { TaskProgress } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-task-progress/completion-task-progress.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

const TOTAL_RAPPORT = ALL_COMPANION_IDS.length * MAX_COMPANION_RAPPORT

export function resolveMountTraining(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const mt = charData?.mountTraining
  if (mt === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const stat = String(itemPath[0])
    if (stat === "speed") return { current: mt.speed, total: mt.maxSpeed }
    if (stat === "stamina") return { current: mt.stamina, total: mt.maxStamina }
    if (stat === "carryCapacity") return { current: mt.carryCapacity, total: mt.maxCarryCapacity }
    return undefined
  }

  const current = mt.speed + mt.stamina + mt.carryCapacity
  const total = mt.maxSpeed + mt.maxStamina + mt.maxCarryCapacity
  return { current, total }
}

export function resolveTraitResearch(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const tr = charData?.traitResearch
  if (tr === undefined) return undefined
  return tallyPathScopedLeaves(
    tr,
    (craftType) => craftType.lines,
    (line) => line.traits,
    (trait) => trait.known,
    itemPath
  )
}

export function resolveCadwell(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const cadwell = charData?.cadwell
  if (cadwell === undefined) return undefined
  return tallyPathScopedLeaves(
    cadwell.levels,
    (level) => level.zones,
    (zone) => zone.pois,
    (poi) => poi.completed,
    itemPath
  )
}

export function resolveCompanionQuests(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const quests = charData?.quests
  if (quests === undefined) return undefined
  const completedIds = new Set<number>(quests)

  if (itemPath !== undefined && itemPath.length > 0) {
    const companionId = itemPath[0]
    if (typeof companionId !== "string") return undefined
    const group = COMPANION_QUEST_DATA.find((g) => g.companionId === companionId)
    if (group === undefined) return undefined
    let current = 0
    for (const q of group.quests) {
      if (completedIds.has(q.questId)) current++
    }
    return { current, total: group.quests.length }
  }

  let current = 0
  let total = 0
  for (const group of COMPANION_QUEST_DATA) {
    for (const q of group.quests) {
      total++
      if (completedIds.has(q.questId)) current++
    }
  }
  return { current, total }
}

export function resolveCompanionRapport(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const rapport = charData?.companionRapport
  const done = new Set<number>(charData?.quests ?? [])
  const heldBy = (defId: number): number => {
    const companionId = companionIdOfDefId(defId)
    const questLeft = companionId !== undefined && hasCompanionQuestLeft(companionId, done)
    return heldCompanionRapport(rapport?.[defId] ?? 0, questLeft)
  }

  if (itemPath !== undefined && itemPath.length > 0) {
    const companionId = itemPath[0]
    if (typeof companionId !== "number") return undefined
    return { current: heldBy(companionId), total: MAX_COMPANION_RAPPORT }
  }

  let current = 0
  for (const defId of ALL_COMPANION_IDS) current += heldBy(defId)
  return { current, total: TOTAL_RAPPORT }
}

export function resolveLoreLibrary(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const ll = charData?.loreLibrary
  if (ll === undefined) return undefined
  const counted = countLoreLibrary(ll, itemPath)
  if (counted.total === 0) return undefined
  return counted
}

export function resolveAntiquityLore(account: AccountCompletion): TaskProgress | undefined {
  const antiquityLore = account.antiquityLore
  if (antiquityLore === undefined) return undefined

  let current = 0
  let total = 0

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const loreEntries = GetNumAntiquityLoreEntries(antiquityId)
    if (loreEntries > 0) {
      total += loreEntries
      const acquired = antiquityLore[antiquityId]
      if (acquired !== undefined) {
        current += acquired
      }
    }
    antiquityId = GetNextAntiquityId(antiquityId)
  }

  if (total === 0) return undefined
  return { current, total }
}
