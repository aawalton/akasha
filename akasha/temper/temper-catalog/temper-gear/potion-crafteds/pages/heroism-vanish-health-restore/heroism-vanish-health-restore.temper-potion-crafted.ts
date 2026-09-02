import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const heroismVanishHealthRestore = {
  id: "01a05fd8-a449-7d5a-bfaa-c9f7bf4ab4ba",
  pageTypeSlug: "temper-potion-crafted",
  slug: "heroism-vanish-health-restore",
  title: "Essence of Invisible",
  key: "heroism-vanish-health-restore",
  description: "Grants Heroism, Invisible, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_011_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon's Bile", "Dragon's Blood", "Spider Egg"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
