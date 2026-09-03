import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceUppercut = {
  id: "019e6f53-a9a7-758a-ac8c-d736a757e64d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-uppercut",
  title: "Vengeance Uppercut",
  key: "vengeance-uppercut",
  baseName: "Vengeance Uppercut",
  description: '"Slam an enemy with an upward swing, dealing |cffffff12799|r Physical Damage."',
  icon: "/esoui/art/icons/ability_2handed_001.dds",
  esoSkillId: 240453,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "active",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
