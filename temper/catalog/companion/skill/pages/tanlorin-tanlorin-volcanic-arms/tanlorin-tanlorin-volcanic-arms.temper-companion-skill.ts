import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const tanlorinTanlorinVolcanicArms = {
  id: "019e6484-38ab-7217-8c87-e54984d87279",
  type: "page-type/temper-companion-skill",
  slug: "tanlorin-tanlorin-volcanic-arms",
  key: "tanlorin-volcanic-arms",
  title: "Volcanic Arms",
  icon: "/esoui/art/icons/ability_companion_dragonknight_volcanicarms.dds",
  description:
    "Your Companion charges their and their grouped allies' weapons with volcanic power to gain Major Brutality and Sorcery, increasing Weapon and Spell Damage by 20% for $$1 seconds.",
  companionId: "temper-eso-companion/tanlorin",
  abilityId: 214703,
  skillLineId: "temper-companion-skill-line/companion-tanlorin-radiating-heart",
  skillType: "temper-skill-type/active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.403Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
