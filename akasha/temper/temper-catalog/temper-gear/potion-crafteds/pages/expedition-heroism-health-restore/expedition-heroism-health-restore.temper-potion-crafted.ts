import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionHeroismHealthRestore = {
  id: "01a05fd8-a444-7de3-9eb3-854f4e486e9e",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-heroism-health-restore",
  title: "Essence of Speed",
  key: "expedition-heroism-health-restore",
  description: "Grants Heroism, Lingering Health, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon's Blood", "Dragon Rheum", "Powdered Mother of Pearl"],
    },
    {
      names: ["Dragon's Blood", "Dragon Rheum", "Scrib Jelly"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
