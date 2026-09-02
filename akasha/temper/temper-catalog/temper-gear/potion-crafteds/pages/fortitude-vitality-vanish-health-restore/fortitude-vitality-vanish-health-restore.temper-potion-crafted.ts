import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeVitalityVanishHealthRestore = {
  id: "01a05fd8-a448-7018-b82a-2096161a065a",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-vitality-vanish-health-restore",
  title: "Essence of Health",
  key: "fortitude-vitality-vanish-health-restore",
  description: "Grants Restore Health, Invisible, Vitality.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blue Entoloma", "Butterfly Wing", "Dragon's Bile"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
