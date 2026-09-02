import type { TemperSkill } from "../temper-skill.page-type.ts"

export const wreckingBlow = {
  id: "01a05fd2-1e9a-7e4a-b792-e1229c2818a3",
  pageTypeSlug: "temper-skill",
  slug: "wrecking-blow",
  title: "Wrecking Blow",
  key: "wrecking-blow",
  baseName: "Uppercut",
  description:
    '"Slam an enemy with an upward swing, dealing 2760 Physical Damage.\\n\\nGrants you Empower and Major Berserk for 3 seconds, increasing the damage of your Heavy Attacks against monsters by 70% and your damage done by 10%."',
  icon: "/esoui/art/icons/ability_2handed_001_b.dds",
  esoSkillId: 40008,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
