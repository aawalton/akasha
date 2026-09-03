import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionHeroismHealthRestore = {
  id: "019e21f6-406c-7257-849f-626045c248e8",
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
