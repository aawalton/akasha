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
      reagents: [
        "temper-reagent/blessed-thistle",
        "temper-reagent/bugloss",
        "temper-reagent/columbine",
      ],
    },
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/chaurus-egg",
        "temper-reagent/columbine",
      ],
    },
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/columbine",
        "temper-reagent/dragons-blood",
      ],
    },
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/columbine",
        "temper-reagent/dragonthorn",
      ],
    },
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/columbine",
        "temper-reagent/mountain-flower",
      ],
    },
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/corn-flower",
        "temper-reagent/mountain-flower",
      ],
    },
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/dragon-rheum",
        "temper-reagent/mountain-flower",
      ],
    },
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/ladys-smock",
        "temper-reagent/mountain-flower",
      ],
    },
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/mountain-flower",
        "temper-reagent/vile-coagulant",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
