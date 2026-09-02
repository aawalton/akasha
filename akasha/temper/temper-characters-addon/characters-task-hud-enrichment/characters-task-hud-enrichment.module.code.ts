import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import {
  findFirstIncompleteCadwellZone,
  sortCadwellPois,
} from "@akasha/temper-player-completion/completion-cadwell-sort"
import { findFirstIncompleteLoreCollection } from "@akasha/temper-player-completion/completion-lore-collection"
import { extractLoreKnownSet } from "@akasha/temper-player-completion/completion-lore-library-progress"
import type { TaskData } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import {
  type ActiveAntiquityLead,
  collectActiveAntiquityLeads,
  isActionableLead,
  isLegendaryLead,
  isMotifLead,
} from "../characters-antiquity-lead-checks/characters-antiquity-lead-checks.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import { taskHasCardAndPathEntry } from "../characters-task-card-match/characters-task-card-match.module.code.ts"
import {
  type CompanionQuestEnrichment,
  pickFirstIncompleteCompanionQuest,
} from "../characters-task-hud-companion-quests/characters-task-hud-companion-quests.module.code.ts"
import {
  type CompanionRapportEnrichment,
  pickFirstIncompleteCompanionRapport,
} from "../characters-task-hud-companion-rapport/characters-task-hud-companion-rapport.module.code.ts"
import { UNDAUNTED_SKILL_LINE_ID } from "../characters-task-hud-state/characters-task-hud-state.module.code.ts"

export function getCompanionRapportEnrichment(): CompanionRapportEnrichment | undefined {
  return pickFirstIncompleteCompanionRapport(currentCharacterEntry()?.companionRapport)
}

export function getCompanionQuestEnrichment(): CompanionQuestEnrichment | undefined {
  const charEntry = currentCharacterEntry()
  const quests = charEntry?.quests
  const completedIds = quests !== undefined ? new Set<number>(quests) : undefined
  return pickFirstIncompleteCompanionQuest(completedIds, charEntry?.companionRapport)
}

export function isUndauntedTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(task, "skill-lines", 0, UNDAUNTED_SKILL_LINE_ID)
}

export interface CadwellEnrichment {
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

export const SHALIDORS_LIBRARY_CATEGORY = 1

export function isLoreLibraryTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(task, "lore-library-character", 0, SHALIDORS_LIBRARY_CATEGORY)
}

export interface LoreLibraryEnrichment {
  collectionName: string
  unreadBooks: readonly string[]
  knownBooks: number
  totalBooks: number
}

export function getLoreLibraryEnrichment(): LoreLibraryEnrichment | undefined {
  const ll = currentCharacterEntry()?.loreLibrary
  if (ll === undefined) return undefined

  const shalidor = LORE_LIBRARY_DATA.find((c) => c.categoryIndex === SHALIDORS_LIBRARY_CATEGORY)
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

export const DRAGONGUARD_OPERATIVE_ACHIEVEMENT = 2612

export function isDragonguardTask(task: TaskData): boolean {
  return taskHasCardAndPathEntry(
    task,
    "character-achievements",
    2,
    DRAGONGUARD_OPERATIVE_ACHIEVEMENT
  )
}

export interface DragonguardBadge {
  id: string
  label: string
}

export function getDragonguardBadges(): DragonguardBadge[] {
  return [
    { id: "delve-daily", label: "Delve Daily" },
    { id: "dragon-hunt-daily", label: "Dragon Hunt Daily" },
  ]
}

export interface AntiquityLeadGroup {
  readonly digZone: string
  readonly completedThisSession: number
  readonly totalAtSessionStart: number
  readonly leadNames: readonly string[]
}

export interface AntiquityLeadEnrichment {
  readonly groups: readonly AntiquityLeadGroup[]
  readonly ungrouped: readonly string[]
}

const ANTIQUITY_LEAD_PREDICATE: Record<string, (lead: ActiveAntiquityLead) => boolean> = {
  "antiquity-lore": isActionableLead,
  "antiquity-leads-motifs": isMotifLead,
  "antiquity-leads-legendary": isLegendaryLead,
}

export function buildAntiquityLeadEnrichment(
  this: void,
  current: readonly ActiveAntiquityLead[],
  baseline: readonly ActiveAntiquityLead[],
  resolveDigZone: (this: void, antiquityId: number) => string | undefined
): AntiquityLeadEnrichment {
  const sorted = [...current].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  const zoneOrder: string[] = []
  const namesByZone: Record<string, string[]> = {}
  const ungrouped: string[] = []
  for (const lead of sorted) {
    const digZone = resolveDigZone(lead.antiquityId)
    if (digZone === undefined) {
      ungrouped.push(lead.name)
      continue
    }
    const names = namesByZone[digZone]
    if (names === undefined) {
      namesByZone[digZone] = [lead.name]
      zoneOrder.push(digZone)
    } else {
      names.push(lead.name)
    }
  }

  const currentIds = current.map((lead) => lead.antiquityId)
  const groups = zoneOrder.map((digZone): AntiquityLeadGroup => {
    const leadNames = namesByZone[digZone] ?? []
    const baselineInZone = baseline.filter((lead) => resolveDigZone(lead.antiquityId) === digZone)
    const stillActive = baselineInZone.filter((lead) => currentIds.includes(lead.antiquityId))
    return {
      digZone,
      leadNames,
      totalAtSessionStart: baselineInZone.length > 0 ? baselineInZone.length : leadNames.length,
      completedThisSession: baselineInZone.length - stillActive.length,
    }
  })

  return { groups, ungrouped }
}

let sessionBaselineLeads: readonly ActiveAntiquityLead[] | undefined

function getSessionBaselineLeads(this: void): readonly ActiveAntiquityLead[] {
  if (sessionBaselineLeads === undefined) sessionBaselineLeads = collectActiveAntiquityLeads()
  return sessionBaselineLeads
}

interface AntiquityLeadsView {
  getAntiquityDigZoneName: (this: void, antiquityId: number) => string | undefined
}

interface LeadsHost {
  TemperLeads?: AntiquityLeadsView
}

function asLeadsHost(this: void, value: unknown): LeadsHost {
  return value as LeadsHost
}

function resolveAntiquityDigZone(this: void, antiquityId: number): string | undefined {
  return asLeadsHost(globalThis).TemperLeads?.getAntiquityDigZoneName(antiquityId)
}

export function getAntiquityLeadEnrichment(cardId: string): AntiquityLeadEnrichment {
  const predicate = ANTIQUITY_LEAD_PREDICATE[cardId]
  if (predicate === undefined) return { groups: [], ungrouped: [] }
  return buildAntiquityLeadEnrichment(
    collectActiveAntiquityLeads().filter(predicate),
    getSessionBaselineLeads().filter(predicate),
    resolveAntiquityDigZone
  )
}

export function isAntiquitySessionTask(task: TaskData): boolean {
  const cardId = task.completionCardId
  if (cardId === undefined) return false
  return ANTIQUITY_LEAD_PREDICATE[cardId] !== undefined
}

export function aggregateAntiquitySessionProgress(
  this: void,
  current: readonly ActiveAntiquityLead[],
  baseline: readonly ActiveAntiquityLead[]
): TaskProgress | undefined {
  if (baseline.length === 0) return undefined
  const currentIds = current.map((lead) => lead.antiquityId)
  const stillActive = baseline.filter((lead) => currentIds.includes(lead.antiquityId)).length
  return { current: baseline.length - stillActive, total: baseline.length }
}

export function getAntiquityLeadSessionProgress(
  cardId: string | undefined
): TaskProgress | undefined {
  if (cardId === undefined) return undefined
  const predicate = ANTIQUITY_LEAD_PREDICATE[cardId]
  if (predicate === undefined) return undefined
  return aggregateAntiquitySessionProgress(
    collectActiveAntiquityLeads().filter(predicate),
    getSessionBaselineLeads().filter(predicate)
  )
}
