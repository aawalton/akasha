import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowRider = {
  id: "01a05fd1-7cb8-7b27-aeb2-fb370544eed3",
  pageTypeSlug: "temper-skill",
  slug: "shadow-rider",
  title: "Shadow Rider",
  key: "shadow-rider",
  baseName: "Shadow Rider",
  description: '"Aggression radius from hostile monsters is decreased by 50% while mounted."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_005.dds",
  esoSkillId: 77400,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
} as const satisfies TemperSkill
