import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionVanishHealthRestore = {
  id: "01a05fd8-a445-7bab-a510-c3146a2b680f",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-vanish-health-restore",
  title: "Essence of Speed",
  key: "expedition-vanish-health-restore",
  description: "Grants Speed, Invisible, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Namira's Rot", "Powdered Mother of Pearl", "Spider Egg"],
    },
    {
      names: ["Namira's Rot", "Scrib Jelly", "Spider Egg"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
