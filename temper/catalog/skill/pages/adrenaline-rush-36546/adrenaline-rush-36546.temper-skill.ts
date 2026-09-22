import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const adrenalineRush36546 = {
  id: "019e6f53-9e96-7ceb-90ac-13772d3c68c0",
  type: "page-type/temper-skill",
  slug: "adrenaline-rush-36546",
  title: "Adrenaline Rush",
  key: "adrenaline-rush-36546",
  baseName: "Adrenaline Rush",
  description:
    '"When you deal damage, you restore |cffffff333|r Stamina. This effect can occur once every |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_armor_012.dds",
  esoSkillId: 36546,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "temper-skill-line/racial-redguard-skills",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
