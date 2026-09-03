import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const heroismVanishHealthRestore = {
  id: "019e21f6-4067-7a27-b972-2d109d92401f",
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
} as const satisfies TemperPotionCrafted
