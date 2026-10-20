import {
  antiquityLeadOfCard,
  canReadLeadSources,
  collectOutstandingAntiquities,
  type OutstandingAntiquity,
} from "akasha/temper/addon/pages/characters/modules/characters-antiquity-lead-checks/characters-antiquity-lead-checks.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { taskHasCardAndPathEntry } from "akasha/temper/addon/pages/characters/modules/characters-task-card-match/characters-task-card-match.module.code.ts"
import {
  type CompanionQuestEnrichment,
  type CompanionRapportEnrichment,
  pickFirstTakeableCompanionQuest,
  pickFirstUnfinishedCompanion,
} from "akasha/temper/addon/pages/characters/modules/characters-task-hud-companion-rapport/characters-task-hud-companion-rapport.module.code.ts"
import { UNDAUNTED_SKILL_LINE_ID } from "akasha/temper/addon/pages/characters/modules/characters-task-hud-state/characters-task-hud-state.module.code.ts"
import { loreLibraryOfPages } from "akasha/temper/player/completion/modules/lore-library-pages/lore-library-pages.module.code.ts"
import {
  findFirstIncompleteCadwellZone,
  sortCadwellPois,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-cadwell-sort/completion-cadwell-sort.module.code.ts"
import { findFirstIncompleteLoreCollection } from "akasha/temper/player/completion/temper-player-completion/modules/completion-lore-collection/completion-lore-collection.module.code.ts"
import { extractLoreKnownSet } from "akasha/temper/player/completion/temper-player-completion/modules/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import type { TaskData } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import type { TaskProgress } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-task-progress/completion-task-progress.module.code.ts"

export function getCompanionRapportEnrichment(): CompanionRapportEnrichment | undefined {
  const charEntry = currentCharacterEntry()
  return pickFirstUnfinishedCompanion(
    charEntry?.companionRapport,
    new Set<number>(charEntry?.quests ?? [])
  )
}

export function getCompanionQuestEnrichment(): CompanionQuestEnrichment | undefined {
  const charEntry = currentCharacterEntry()
  return pickFirstTakeableCompanionQuest(
    charEntry?.companionRapport,
    new Set<number>(charEntry?.quests ?? [])
  )
}

export function isUndauntedTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(task, "skill-lines", 0, UNDAUNTED_SKILL_LINE_ID)
}

interface CadwellEnrichment {
  zoneName: string
  incompletePois: readonly string[]
  completedPois: number
  totalPois: number
}

export function getCadwellEnrichment(task: TaskData): CadwellEnrichment | undefined {
  const cadwell = currentCharacterEntry()?.cadwell
  if (cadwell === undefined) return undefined

  const path = task.completionItemPath

  if (path !== undefined && path.length > 1) {
    const levelId = Number(path[0])
    const zoneId = Number(path[1])
    const zone = cadwell.levels[levelId]?.zones[zoneId]
    if (zone === undefined) return undefined
    const sortedPois = sortCadwellPois(zone.pois)
    const incompletePois = sortedPois.filter((p) => !p.completed).map((p) => p.name)
    if (incompletePois.length === 0) return undefined
    const totalPois = sortedPois.length
    return {
      zoneName: zone.name,
      incompletePois,
      completedPois: totalPois - incompletePois.length,
      totalPois,
    }
  }

  const levelScope = path !== undefined && path.length > 0 ? Number(path[0]) : undefined
  const result = findFirstIncompleteCadwellZone(cadwell, levelScope)
  if (result === undefined) return undefined
  return {
    zoneName: result.zoneName,
    incompletePois: [...result.incompletePoiNames],
    completedPois: result.totalPois - result.incompletePoiNames.length,
    totalPois: result.totalPois,
  }
}

const SHALIDORS_LIBRARY_CATEGORY = 1

export function isLoreLibraryTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(task, "lore-library-character", 0, SHALIDORS_LIBRARY_CATEGORY)
}

interface LoreLibraryEnrichment {
  collectionName: string
  unreadBooks: readonly string[]
  knownBooks: number
  totalBooks: number
}

export function getLoreLibraryEnrichment(): LoreLibraryEnrichment | undefined {
  const ll = currentCharacterEntry()?.loreLibrary
  if (ll === undefined) return undefined

  const shalidor = loreLibraryOfPages().find((c) => c.categoryIndex === SHALIDORS_LIBRARY_CATEGORY)
  if (shalidor === undefined) return undefined

  const result = findFirstIncompleteLoreCollection(
    shalidor.collections,
    extractLoreKnownSet(ll),
    SHALIDORS_LIBRARY_CATEGORY
  )
  if (result === undefined) return undefined
  return {
    collectionName: result.collectionName,
    unreadBooks: [...result.unreadBookNames],
    knownBooks: result.knownBooks,
    totalBooks: result.totalBooks,
  }
}

const DRAGONGUARD_OPERATIVE_ACHIEVEMENT = 2612

export function isDragonguardTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(
    task,
    "character-achievements",
    2,
    DRAGONGUARD_OPERATIVE_ACHIEVEMENT
  )
}

interface DragonguardBadge {
  id: string
  label: string
}

export function getDragonguardBadges(): DragonguardBadge[] {
  return [
    { id: "delve-daily", label: "Delve Daily" },
    { id: "dragon-hunt-daily", label: "Dragon Hunt Daily" },
  ]
}

interface AntiquityLeadGroup {
  readonly digZone: string
  readonly completedThisSession: number
  readonly totalAtSessionStart: number
  readonly leads: readonly OutstandingAntiquity[]
}

export interface AntiquityLeadEnrichment {
  readonly groups: readonly AntiquityLeadGroup[]
  readonly ungrouped: readonly OutstandingAntiquity[]
}

function heldFirstThenByName(this: void, a: OutstandingAntiquity, b: OutstandingAntiquity): number {
  const aHeld = a.source === "held" ? 0 : 1
  const bHeld = b.source === "held" ? 0 : 1
  if (aHeld !== bHeld) return aHeld - bHeld
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
}

function buildAntiquityLeadEnrichment(
  this: void,
  current: readonly OutstandingAntiquity[],
  baseline: readonly OutstandingAntiquity[],
  resolveDigZone: (this: void, antiquityId: number) => string | undefined
): AntiquityLeadEnrichment {
  const sorted = [...current].sort(heldFirstThenByName)

  const zoneOrder: string[] = []
  const leadsByZone: Record<string, OutstandingAntiquity[]> = {}
  const ungrouped: OutstandingAntiquity[] = []
  for (const lead of sorted) {
    const digZone = resolveDigZone(lead.antiquityId)
    if (digZone === undefined) {
      ungrouped.push(lead)
      continue
    }
    const leads = leadsByZone[digZone]
    if (leads === undefined) {
      leadsByZone[digZone] = [lead]
      zoneOrder.push(digZone)
    } else {
      leads.push(lead)
    }
  }

  zoneOrder.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

  const currentIds = current.map((lead) => lead.antiquityId)
  const groups = zoneOrder.map((digZone): AntiquityLeadGroup => {
    const leads = leadsByZone[digZone] ?? []
    const baselineInZone = baseline.filter((lead) => resolveDigZone(lead.antiquityId) === digZone)
    const stillActive = baselineInZone.filter((lead) => currentIds.includes(lead.antiquityId))
    return {
      digZone,
      leads,
      totalAtSessionStart: baselineInZone.length > 0 ? baselineInZone.length : leads.length,
      completedThisSession: baselineInZone.length - stillActive.length,
    }
  })

  return { groups, ungrouped }
}

const SESSION_BASELINE_BY_CARD: Record<string, readonly OutstandingAntiquity[]> = {}

function getSessionBaseline(
  this: void,
  cardId: string,
  now: readonly OutstandingAntiquity[]
): readonly OutstandingAntiquity[] {
  const kept = SESSION_BASELINE_BY_CARD[cardId]
  if (kept !== undefined) return kept
  if (canReadLeadSources()) SESSION_BASELINE_BY_CARD[cardId] = now
  return now
}

interface AntiquityLeadsView {
  getAntiquityDigZoneName: (this: void, antiquityId: number) => string | undefined
}

interface LeadsHost {
  TemperWorldLeads?: AntiquityLeadsView
}

function asLeadsHost(this: void, value: unknown): LeadsHost {
  return value as LeadsHost
}

function resolveAntiquityDigZone(this: void, antiquityId: number): string | undefined {
  return asLeadsHost(globalThis).TemperWorldLeads?.getAntiquityDigZoneName(antiquityId)
}

export function getAntiquityLeadEnrichment(cardId: string): AntiquityLeadEnrichment {
  const predicate = antiquityLeadOfCard(cardId)
  if (predicate === undefined) return { groups: [], ungrouped: [] }
  const now = collectOutstandingAntiquities(predicate)
  return buildAntiquityLeadEnrichment(now, getSessionBaseline(cardId, now), resolveAntiquityDigZone)
}

export function isAntiquitySessionTask(task: TaskData): boolean {
  return antiquityLeadOfCard(task.completionCardId) !== undefined
}

function aggregateAntiquitySessionProgress(
  this: void,
  current: readonly OutstandingAntiquity[],
  baseline: readonly OutstandingAntiquity[]
): TaskProgress | undefined {
  const currentIds = current.map((lead) => lead.antiquityId)
  const dug = baseline.filter((lead) => !currentIds.includes(lead.antiquityId)).length
  const total = dug + current.length
  if (total === 0) return undefined
  return { current: dug, total }
}

export function getAntiquityLeadSessionProgress(
  cardId: string | undefined
): TaskProgress | undefined {
  const predicate = antiquityLeadOfCard(cardId)
  if (cardId === undefined || predicate === undefined) return undefined
  const now = collectOutstandingAntiquities(predicate)
  return aggregateAntiquitySessionProgress(now, getSessionBaseline(cardId, now))
}
