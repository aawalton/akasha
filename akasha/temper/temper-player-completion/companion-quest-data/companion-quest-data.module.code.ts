import type { CompanionId } from "@akasha/temper-companions-core/companions"

interface CompanionQuestEntry {
  questId: number
  name: string
  requiredRapportLevel?: number
}

interface CompanionQuestGroup {
  companionId: CompanionId
  companionName: string
  quests: readonly CompanionQuestEntry[]
}

export const COMPANION_QUEST_DATA: CompanionQuestGroup[] = [
  {
    companionId: "azandar",
    companionName: "Azandar",
    quests: [
      { questId: 7021, name: "The Fateweaver Key" },
      { questId: 7022, name: "Paths Unwalked", requiredRapportLevel: 5 },
      { questId: 7023, name: "Adversarial Adventures", requiredRapportLevel: 6 },
      { questId: 7024, name: "Tempting Fates", requiredRapportLevel: 7 },
    ],
  },
  {
    companionId: "bastian",
    companionName: "Bastian",
    quests: [
      { questId: 6626, name: "Competition and Contracts" },
      { questId: 6662, name: "Things Lost, Things Found", requiredRapportLevel: 5 },
      { questId: 6664, name: "Family Secrets", requiredRapportLevel: 6 },
    ],
  },
  {
    companionId: "ember",
    companionName: "Ember",
    quests: [
      { questId: 6771, name: "Tower Full of Trouble" },
      { questId: 6785, name: "Cold Trail", requiredRapportLevel: 5 },
      { questId: 6786, name: "Cold Blood, Old Pain", requiredRapportLevel: 6 },
      { questId: 6787, name: "Green with Envy", requiredRapportLevel: 7 },
    ],
  },
  {
    companionId: "isobel",
    companionName: "Isobel",
    quests: [
      { questId: 6760, name: "Tournament of the Heart" },
      { questId: 6789, name: "The Lost Symbol", requiredRapportLevel: 5 },
      { questId: 6790, name: "A Mother's Request", requiredRapportLevel: 6 },
      { questId: 6791, name: "The Princess Detective", requiredRapportLevel: 7 },
    ],
  },
  {
    companionId: "mirri",
    companionName: "Mirri",
    quests: [
      { questId: 6648, name: "Shattered and Scattered" },
      { questId: 6666, name: "A Mother's Obsession", requiredRapportLevel: 5 },
      { questId: 6667, name: "Dead Weight", requiredRapportLevel: 6 },
    ],
  },
  {
    companionId: "sharp-as-night",
    companionName: "Sharp-as-Night",
    quests: [
      { questId: 7017, name: "The Double Edge" },
      { questId: 7018, name: "Between a Rock and a Whetstone", requiredRapportLevel: 5 },
      { questId: 7019, name: "Dim and Distant Pasts", requiredRapportLevel: 6 },
      { questId: 7020, name: "Light the Way to Freedom", requiredRapportLevel: 7 },
    ],
  },
  {
    companionId: "tanlorin",
    companionName: "Tanlorin",
    quests: [
      { questId: 7186, name: "The Garland Ring" },
      { questId: 7187, name: "Thorns and Blossoms", requiredRapportLevel: 5 },
      { questId: 7188, name: "Uprooted", requiredRapportLevel: 6 },
      { questId: 7189, name: "Of Crown and Flowers", requiredRapportLevel: 7 },
    ],
  },
  {
    companionId: "zerith-var",
    companionName: "Zerith-var",
    quests: [
      { questId: 7194, name: "A Moonlit Shadow" },
      { questId: 7207, name: "Beyond a Veil of Twilight", requiredRapportLevel: 5 },
      { questId: 7216, name: "Paths Out Of Darkness", requiredRapportLevel: 6 },
      { questId: 7221, name: "The Dark Behind the World", requiredRapportLevel: 7 },
    ],
  },
]

export const companionQuestIds: Set<number> = new Set(
  COMPANION_QUEST_DATA.flatMap((group) => group.quests.map((q) => q.questId))
)
