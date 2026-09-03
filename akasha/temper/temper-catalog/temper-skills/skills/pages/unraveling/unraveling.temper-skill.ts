import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unraveling = {
  id: "019e6224-ccb4-7d15-8439-542def6a0e79",
  pageTypeSlug: "temper-skill",
  slug: "unraveling",
  title: "Unraveling",
  key: "unraveling",
  baseName: "Unraveling",
  description:
    '"Maximizes the chances of extracting Clothing ingredients and allows the refining of the most powerful tannins from raw materials."',
  icon: "/esoui/art/icons/ability_tradecraft_005.dds",
  esoSkillId: 48195,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
