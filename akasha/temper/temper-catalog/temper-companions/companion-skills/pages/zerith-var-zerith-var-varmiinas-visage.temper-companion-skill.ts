import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarVarmiinasVisage = {
  id: "01a05fd0-1d89-7b91-97a7-562bf9e290c7",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-varmiinas-visage",
  key: "zerith-var-varmiinas-visage",
  title: "Varmiina's Visage",
  icon: "/esoui/art/icons/ability_companion_necromancer_flameskull.dds",
  description:
    "Your Companion launches a nightmarish exploding skull at an enemy, dealing $1 Flame Damage.",
  companionId: "zerith-var",
  abilityId: 213157,
  skillLineId: "companion-zerith-var-warriors-banishment",
  skillType: "active",
  validRoles: ["dps"],
} as const satisfies TemperCompanionSkill
