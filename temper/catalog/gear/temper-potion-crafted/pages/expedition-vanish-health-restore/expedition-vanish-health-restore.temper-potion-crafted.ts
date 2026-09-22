import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionVanishHealthRestore = {
  id: "019e21f6-406e-7dd6-a6ca-a6252a9bbcfe",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-vanish-health-restore",
  title: "Essence of Speed",
  key: "expedition-vanish-health-restore",
  description: "Grants Speed, Invisible, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      names: ["Namira's Rot", "Powdered Mother of Pearl", "Spider Egg"],
    },
    {
      names: ["Namira's Rot", "Scrib Jelly", "Spider Egg"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
