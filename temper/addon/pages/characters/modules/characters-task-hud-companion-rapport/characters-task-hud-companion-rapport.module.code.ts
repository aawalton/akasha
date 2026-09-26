import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"

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

export interface CompanionRapportEnrichment {
  companionName: string
  sources: readonly string[]
  currentPoints: number
}

export function pickFirstIncompleteCompanionRapport(
  rapport: Record<number, number> | undefined
): CompanionRapportEnrichment | undefined {
  for (const entry of COMPANION_RAPPORT_SOURCES) {
    const raw = rapport?.[entry.defId]
    const currentPoints = raw === undefined ? 0 : clampRapportProgress(raw)
    if (currentPoints < MAX_COMPANION_RAPPORT) {
      return { companionName: entry.name, sources: entry.sources, currentPoints }
    }
  }
  return undefined
}
