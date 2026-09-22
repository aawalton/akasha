import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const allSharedPiercingArrow = {
  id: "019e668d-c54e-717c-857e-6243e6cc27f5",
  type: "page-type/temper-companion-skill",
  slug: "all-shared-piercing-arrow",
  key: "shared-piercing-arrow",
  title: "Piercing Arrow",
  icon: "/esoui/art/icons/ability_companion_bow_001.dds",
  description:
    "Your Companion plants a masterfully aimed arrow in an enemy's vital spot, dealing $1 Physical Damage.",
  abilityId: 152793,
  skillLineId: "weapon-bow",
  skillType: "temper-skill-type/active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
