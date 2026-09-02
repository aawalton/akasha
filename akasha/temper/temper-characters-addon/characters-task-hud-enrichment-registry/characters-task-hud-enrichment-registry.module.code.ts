import {
  getSkillMorphEnrichment,
  isSkillMorphTask,
} from "@akasha/temper-characters-skills-morphs-addon/skill-morph-task-hud"
import { MAX_COMPANION_RAPPORT } from "@akasha/temper-player-completion/companion-rapport"
import type { DailyWritProfessionState } from "@akasha/temper-player-completion-state/completion-daily-writs-state"
import type { TaskData } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { formatProgressCount } from "../characters-progress-format/characters-progress-format.module.code.ts"
import {
  getScribingGuildDailyFallback,
  getScribingScriptType,
  getScribingSourceSubRows,
} from "../characters-scribing-sources/characters-scribing-sources.module.code.ts"
import { taskHasCard } from "../characters-task-card-match/characters-task-card-match.module.code.ts"
import {
  type AntiquityLeadEnrichment,
  getAntiquityLeadEnrichment,
  getCadwellEnrichment,
  getCompanionQuestEnrichment,
  getCompanionRapportEnrichment,
  getDragonguardBadges,
  getLoreLibraryEnrichment,
  isDragonguardTask,
  isLoreLibraryTask,
  isUndauntedTask,
} from "../characters-task-hud-enrichment/characters-task-hud-enrichment.module.code.ts"
import {
  type DailyWritRow,
  getDailyWritsEnrichmentRows,
} from "../characters-task-hud-enrichment-daily-writs/characters-task-hud-enrichment-daily-writs.module.code.ts"
import type {
  SubRowColor,
  SubRowSpec,
} from "../characters-task-hud-rows/characters-task-hud-rows.module.code.ts"
import { getDungeonSetsForCurrentZone } from "../characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import {
  filterPledgesForCharacter,
  getTodaysPledges,
} from "../characters-undaunted-pledges/characters-undaunted-pledges.module.code.ts"

export interface SubRowProgress {
  readonly current: number
  readonly total: number
}

export function withProgress(hint: string, progress?: SubRowProgress): string {
  return progress === undefined ? hint : formatProgressCount(hint, progress.current, progress.total)
}

export function groupLabelSpecs(
  header: string,
  leaves: readonly string[],
  progress?: SubRowProgress
): readonly SubRowSpec[] {
  const specs: SubRowSpec[] = [{ text: withProgress(header, progress), color: "default" }]
  for (const leaf of leaves) specs.push({ text: leaf, color: "default", indent: 2 })
  return specs
}

export function flatSpecs(texts: readonly string[]): readonly SubRowSpec[] {
  return texts.map((text): SubRowSpec => ({ text, color: "default" }))
}

export function scribingSpecs(
  primary: readonly {
    readonly achievementName: string
    readonly current: number
    readonly total: number
  }[],
  guildDaily: string
): readonly SubRowSpec[] {
  if (primary.length > 0) {
    return primary.map(
      (s): SubRowSpec => ({
        text: withProgress(s.achievementName, { current: s.current, total: s.total }),
        color: "default",
      })
    )
  }
  return [{ text: guildDaily, color: "default" }]
}

export function skillMorphSpecs(
  entries: readonly {
    readonly skillName: string
    readonly isLineConflict: boolean
    readonly isEquipped: boolean
  }[]
): readonly SubRowSpec[] {
  return entries.map(
    (e): SubRowSpec => ({
      text: e.skillName,
      color: e.isLineConflict ? "purple" : e.isEquipped ? "green" : "yellow",
    })
  )
}

type DisplayedWritState = Exclude<DailyWritProfessionState, "completed">

const DAILY_WRIT_STATE_COLOR: Record<DisplayedWritState, SubRowColor> = {
  notPickedUp: "default",
  pickedUp: "yellow",
  crafted: "green",
}

export function dailyWritsSpecs(rows: readonly DailyWritRow[]): readonly SubRowSpec[] {
  return rows
    .filter(
      (r): r is DailyWritRow & { readonly state: DisplayedWritState } => r.state !== "completed"
    )
    .map((r): SubRowSpec => ({ text: r.label, color: DAILY_WRIT_STATE_COLOR[r.state] }))
}

export function inventoryVenueSpecs(
  venues: readonly { readonly label: string; readonly count: number }[]
): readonly SubRowSpec[] {
  return venues.map(
    (v): SubRowSpec => ({ text: `${v.label} — ${v.count} items`, color: "default" })
  )
}

export function dungeonSetSpecs(
  zoneName: string,
  sets: readonly {
    readonly name: string
    readonly slotsUnlocked: number
    readonly totalSlots: number
  }[]
): readonly SubRowSpec[] {
  return groupLabelSpecs(
    zoneName,
    sets.map((s) => `${s.slotsUnlocked}/${s.totalSlots} ${s.name}`)
  )
}

export function antiquityLeadSpecs(enrichment: AntiquityLeadEnrichment): readonly SubRowSpec[] {
  const specs: SubRowSpec[] = []
  for (const group of enrichment.groups) {
    for (const spec of groupLabelSpecs(group.digZone, group.leadNames, {
      current: group.completedThisSession,
      total: group.totalAtSessionStart,
    })) {
      specs.push(spec)
    }
  }
  for (const spec of flatSpecs(enrichment.ungrouped)) specs.push(spec)
  return specs
}

export interface EnrichmentSelector {
  readonly key: string
  readonly matches: (this: void, task: TaskData) => boolean
  readonly select: (this: void, task: TaskData) => readonly SubRowSpec[]
}

export const ENRICHMENT_SELECTORS: readonly EnrichmentSelector[] = [
  {
    key: "undaunted",
    matches: isUndauntedTask,
    select: (): readonly SubRowSpec[] => {
      const filtered = filterPledgesForCharacter(getTodaysPledges())
      if (filtered.length > 0) return flatSpecs(filtered.map((p) => p.dungeonLabel))
      return flatSpecs(["Undaunted Delve Daily"])
    },
  },
  {
    key: "dailyWrits",
    matches: (task): boolean => taskHasCard(task, "daily-writs"),
    select: (): readonly SubRowSpec[] => dailyWritsSpecs(getDailyWritsEnrichmentRows()),
  },
  {
    key: "scribing",
    matches: (task): boolean => getScribingScriptType(task) !== undefined,
    select: (task): readonly SubRowSpec[] => {
      const scriptType = getScribingScriptType(task)
      if (scriptType === undefined) return []
      return scribingSpecs(
        getScribingSourceSubRows(scriptType),
        getScribingGuildDailyFallback(scriptType)
      )
    },
  },
  {
    key: "cadwell",
    matches: (task): boolean => taskHasCard(task, "cadwells-almanac"),
    select: (task): readonly SubRowSpec[] => {
      const e = getCadwellEnrichment(task)
      return e === undefined
        ? []
        : groupLabelSpecs(e.zoneName, e.incompletePois, {
            current: e.completedPois,
            total: e.totalPois,
          })
    },
  },
  {
    key: "loreLibrary",
    matches: isLoreLibraryTask,
    select: (): readonly SubRowSpec[] => {
      const e = getLoreLibraryEnrichment()
      return e === undefined
        ? []
        : groupLabelSpecs(e.collectionName, e.unreadBooks, {
            current: e.knownBooks,
            total: e.totalBooks,
          })
    },
  },
  {
    key: "skillMorph",
    matches: isSkillMorphTask,
    select: (task): readonly SubRowSpec[] => {
      const e = getSkillMorphEnrichment(task)
      return e === undefined ? [] : skillMorphSpecs(e)
    },
  },
  {
    key: "companionRapport",
    matches: (task): boolean => taskHasCard(task, "companion-rapport-character"),
    select: (): readonly SubRowSpec[] => {
      const e = getCompanionRapportEnrichment()
      return e === undefined
        ? []
        : groupLabelSpecs(e.companionName, e.sources, {
            current: e.currentPoints,
            total: MAX_COMPANION_RAPPORT,
          })
    },
  },
  {
    key: "companionQuest",
    matches: (task): boolean => taskHasCard(task, "companion-quests"),
    select: (): readonly SubRowSpec[] => {
      const e = getCompanionQuestEnrichment()
      return e === undefined ? [] : groupLabelSpecs(e.companionName, [e.questName])
    },
  },
  {
    key: "dragonguard",
    matches: isDragonguardTask,
    select: (): readonly SubRowSpec[] => flatSpecs(getDragonguardBadges().map((b) => b.label)),
  },
  {
    key: "inventoryManagement",
    matches: (task): boolean => taskHasCard(task, "inventory-management"),
    select: (): readonly SubRowSpec[] => {
      const summary = globalThis.TemperInventory?.getInventoryActionSummary()
      return summary === undefined ? [] : inventoryVenueSpecs(summary.venues)
    },
  },
  {
    key: "dungeonSets",
    matches: (task): boolean => taskHasCard(task, "dungeon-sets"),
    select: (): readonly SubRowSpec[] => {
      const ds = getDungeonSetsForCurrentZone()
      return ds === undefined ? [] : dungeonSetSpecs(ds.zoneName, ds.incompleteSets)
    },
  },
  {
    key: "antiquityLore",
    matches: (task): boolean => taskHasCard(task, "antiquity-lore"),
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-lore")),
  },
  {
    key: "antiquityMotifs",
    matches: (task): boolean => taskHasCard(task, "antiquity-leads-motifs"),
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-leads-motifs")),
  },
  {
    key: "antiquityLegendary",
    matches: (task): boolean => taskHasCard(task, "antiquity-leads-legendary"),
    select: (): readonly SubRowSpec[] =>
      antiquityLeadSpecs(getAntiquityLeadEnrichment("antiquity-leads-legendary")),
  },
]
