import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedPiercingArrow = {
  id: "01a05fd0-1d6f-7b21-9e2c-b0648419bf33",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-piercing-arrow",
  key: "shared-piercing-arrow",
  title: "Piercing Arrow",
  icon: "/esoui/art/icons/ability_companion_bow_001.dds",
  description:
    "Your Companion plants a masterfully aimed arrow in an enemy's vital spot, dealing $1 Physical Damage.",
  companionId: "all",
  abilityId: 152793,
  skillLineId: "weapon-bow",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
