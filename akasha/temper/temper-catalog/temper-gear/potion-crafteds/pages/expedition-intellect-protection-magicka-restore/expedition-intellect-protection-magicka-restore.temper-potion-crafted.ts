import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionIntellectProtectionMagickaRestore = {
  id: "01a05fd8-a445-79f5-aef1-53a5720ff9ce",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-intellect-protection-magicka-restore",
  title: "Essence of Magicka",
  key: "expedition-intellect-protection-magicka-restore",
  description: "Grants Speed, Restore Magicka, Protection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon Rheum", "Powdered Mother of Pearl", "Vile Coagulant"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
