import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceSavageryStaminaRestoreStealthDetection = {
  id: "01a05fd8-a444-729f-a13e-cd596dd7e028",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-savagery-stamina-restore-stealth-detection",
  title: "Essence of Weapon Crit",
  key: "endurance-savagery-stamina-restore-stealth-detection",
  description: "Grants Restore Stamina, Detection, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Chaurus Egg", "Dragonthorn", "Wormwood"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
