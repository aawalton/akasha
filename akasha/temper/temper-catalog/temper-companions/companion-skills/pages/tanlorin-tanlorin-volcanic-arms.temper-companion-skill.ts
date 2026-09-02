import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinVolcanicArms = {
  id: "01a05fd0-1d87-7801-a250-d97bba163b31",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-volcanic-arms",
  key: "tanlorin-volcanic-arms",
  title: "Volcanic Arms",
  icon: "/esoui/art/icons/ability_companion_dragonknight_volcanicarms.dds",
  description:
    "Your Companion charges their and their grouped allies' weapons with volcanic power to gain Major Brutality and Sorcery, increasing Weapon and Spell Damage by 20% for $$1 seconds.",
  companionId: "tanlorin",
  abilityId: 214703,
  skillLineId: "companion-tanlorin-radiating-heart",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
