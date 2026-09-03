import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const momentum = {
  id: "019e6f53-a497-7626-b486-5f24cb3abb2b",
  pageTypeSlug: "temper-skill",
  slug: "momentum",
  title: "Momentum",
  key: "momentum",
  baseName: "Momentum",
  description:
    '"Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%, as well as gaining Minor Endurance, increasing your Stamina Recovery by |cffffff15|r% for |cffffff30|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_005.dds",
  esoSkillId: 28297,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
