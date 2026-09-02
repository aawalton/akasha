import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const brutalityEnduranceSavageryStaminaRestore = {
  id: "01a05fd8-a441-70fc-9160-7219206223e5",
  pageTypeSlug: "temper-potion-crafted",
  slug: "brutality-endurance-savagery-stamina-restore",
  title: "Essence of Weapon Power",
  key: "brutality-endurance-savagery-stamina-restore",
  description: "Grants Restore Stamina, Increase Weapon Power, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_005_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Dragonthorn", "Water Hyacinth"],
    },
    {
      names: ["Blessed Thistle", "Dragonthorn", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
