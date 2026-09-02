import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceForceShock = {
  id: "01a05fd1-d2a5-7d9e-8c10-79085bb6b48c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-force-shock",
  title: "Vengeance Force Shock",
  key: "vengeance-force-shock",
  baseName: "Vengeance Force Shock",
  description:
    '"Focus on one of the elemental energies with your staff and blast an enemy for |cffffff10017|r Flame Damage, |cffffff10017|r Frost Damage, or |cffffff10017|r Shock Damage."',
  icon: "/esoui/art/icons/ability_destructionstaff_001.dds",
  esoSkillId: 241291,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
