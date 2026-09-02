import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionVitalityProtectionHealthRestore = {
  id: "01a05fd8-a446-7cb0-9d96-f358ab7420ae",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-vitality-protection-health-restore",
  title: "Essence of Speed",
  key: "expedition-vitality-protection-health-restore",
  description: "Grants Protection, Vitality, Lingering Health, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Powdered Mother of Pearl", "Scrib Jelly"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
