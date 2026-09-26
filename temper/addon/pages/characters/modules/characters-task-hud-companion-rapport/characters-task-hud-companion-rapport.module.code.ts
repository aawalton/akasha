import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import {
  hasCompanionQuestLeft,
  pickFirstActionableCompanionQuest,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-actionability/completion-companion-quest-actionability.module.code.ts"

interface CompanionRapportSource {
  companionId: string
  defId: number
  name: string
  sources: readonly string[]
}

const COMPANION_RAPPORT_SOURCES: readonly CompanionRapportSource[] = [
  {
    companionId: "azandar",
    defId: 9,
    name: "Azandar",
    sources: ["Enchanting Writ Daily", "Necrom Delve Daily (Ordinator Tilena)"],
  },
  {
    companionId: "bastian",
    defId: 1,
    name: "Bastian",
    sources: ["Mages Guild Daily (Alvur Baren)"],
  },
  {
    companionId: "ember",
    defId: 5,
    name: "Ember",
    sources: [
      "Thieves Guild Heist Daily",
      "Mages Guild Daily (Alvur Baren)",
      "High Isle Delve Daily (Wayllod)",
    ],
  },
  {
    companionId: "isobel",
    defId: 6,
    name: "Isobel",
    sources: ["Undaunted Daily (Bolgrul)", "High Isle World Boss Daily (Parisse Plouff)"],
  },
  {
    companionId: "mirri",
    defId: 2,
    name: "Mirri",
    sources: ["Fighters Guild Daily (Cardea Gallus)", "Ashlander Relic Daily (Numani-Rasi)"],
  },
  {
    companionId: "sharp-as-night",
    defId: 8,
    name: "Sharp-as-Night",
    sources: [
      "Ashlander Daily (Sorim-Nakar or Numani-Rasi)",
      "Necrom World Boss Daily (Ordinator Nelyn)",
    ],
  },
  {
    companionId: "tanlorin",
    defId: 12,
    name: "Tanlorin",
    sources: ["Fighters Guild Daily (Cardea Gallus)", "Alchemy Writ Daily"],
  },
  {
    companionId: "zerith-var",
    defId: 13,
    name: "Zerith-var",
    sources: ["Defense Force Daily (Zahari, Grahtwood Northern Gate)", "Tales of Tribute Daily"],
  },
]

export function companionIdOfDefId(defId: number): string | undefined {
  return COMPANION_RAPPORT_SOURCES.find((entry) => entry.defId === defId)?.companionId
}

function defIdOf(this: void, companionId: string): number | undefined {
  return COMPANION_RAPPORT_SOURCES.find((entry) => entry.companionId === companionId)?.defId
}

export interface CompanionRapportEnrichment {
  companionName: string
  questName: string | undefined
  sources: readonly string[]
  currentPoints: number
}

export interface CompanionQuestEnrichment {
  companionName: string
  questName: string
}

export function pickFirstUnfinishedCompanion(
  rapport: Record<number, number> | undefined,
  completedQuestIds: ReadonlySet<number>
): CompanionRapportEnrichment | undefined {
  for (const entry of COMPANION_RAPPORT_SOURCES) {
    const raw = rapport?.[entry.defId]
    const currentPoints = raw === undefined ? 0 : clampRapportProgress(raw)
    const rapportLeft = currentPoints < MAX_COMPANION_RAPPORT
    if (!rapportLeft && !hasCompanionQuestLeft(entry.companionId, completedQuestIds)) continue
    const quest = pickFirstActionableCompanionQuest(
      completedQuestIds,
      rapport ?? {},
      defIdOf,
      entry.companionId
    )
    return {
      companionName: entry.name,
      questName: quest?.questName,
      sources: rapportLeft ? entry.sources : [],
      currentPoints,
    }
  }
  return undefined
}

export function pickFirstTakeableCompanionQuest(
  rapport: Record<number, number> | undefined,
  completedQuestIds: ReadonlySet<number>
): CompanionQuestEnrichment | undefined {
  const pick = pickFirstActionableCompanionQuest(completedQuestIds, rapport ?? {}, defIdOf)
  if (pick === undefined) return undefined
  return { companionName: pick.companionName, questName: pick.questName }
}
