import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceIntellectMagickaRestoreStaminaRestoreStealthDetection = {
  id: "019e21f6-4061-7081-85cb-4af7a4129705",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection",
  title: "Essence of Magicka",
  key: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection",
  description: "Grants Restore Stamina, Detection, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Chaurus Egg", "Columbine", "Corn Flower"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
