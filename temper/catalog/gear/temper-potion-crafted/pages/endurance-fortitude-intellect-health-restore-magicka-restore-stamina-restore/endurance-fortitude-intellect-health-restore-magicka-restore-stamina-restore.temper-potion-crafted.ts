import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceFortitudeIntellectHealthRestoreMagickaRestoreStaminaRestore = {
  id: "019e21f6-404e-775b-9146-bebdd4e0704b",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore",
  title: "Essence of Health",
  key: "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Health, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Blessed Thistle", "Bugloss", "Columbine"],
    },
    {
      reagents: ["Bugloss", "Chaurus Egg", "Columbine"],
    },
    {
      reagents: ["Bugloss", "Columbine", "Dragon's Blood"],
    },
    {
      reagents: ["Bugloss", "Columbine", "Dragonthorn"],
    },
    {
      reagents: ["Bugloss", "Columbine", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Corn Flower", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Dragon Rheum", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Lady's Smock", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Mountain Flower", "Vile Coagulant"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
