import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const catalyst = {
  id: "019e6245-a611-7515-be64-f1e3d7d0e883",
  pageTypeSlug: "temper-skill",
  slug: "catalyst",
  title: "Catalyst",
  key: "catalyst",
  baseName: "Catalyst",
  description: '"After drinking a potion you gain 22 Ultimate."',
  icon: "/esoui/art/icons/passive_sorcerer_046.dds",
  esoSkillId: 45135,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "unsupported",
} as const satisfies TemperSkill
