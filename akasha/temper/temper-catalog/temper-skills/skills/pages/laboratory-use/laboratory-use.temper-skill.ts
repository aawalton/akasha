import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const laboratoryUse = {
  id: "019e6224-cc9f-7d8c-801a-26d49adbedce",
  pageTypeSlug: "temper-skill",
  slug: "laboratory-use",
  title: "Laboratory Use",
  key: "laboratory-use",
  baseName: "Laboratory Use",
  description: '"Allows the use of up to 3 reagents while mixing Potions or Poisons."',
  icon: "/esoui/art/icons/ability_alchemy_002.dds",
  esoSkillId: 45555,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 15,
  morphIndex: 0,
  rank: 1,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
