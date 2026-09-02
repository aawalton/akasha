import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaFlood = {
  id: "01a05fd1-2df3-7f18-be4c-b07046f8f6e2",
  pageTypeSlug: "temper-skill",
  slug: "magicka-flood",
  title: "Magicka Flood",
  key: "magicka-flood",
  baseName: "Magicka Flood",
  description: '"Increases your Max Magicka and Stamina by 6%."',
  icon: "/esoui/art/icons/passive_sorcerer_008.dds",
  esoSkillId: 45150,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "unsupported",
} as const satisfies TemperSkill
