import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const nightbladeExecutioner = {
  id: "01a05fd1-2e07-73e8-b6f1-512cb2802057",
  pageTypeSlug: "temper-skill",
  slug: "nightblade-executioner",
  title: "Executioner",
  key: "nightblade-executioner",
  baseName: "Executioner",
  description:
    '"Your Light and Heavy Attacks against enemies under 25% Health deal 50% more damage. Heavy Attacks that deal a killing blow generate 16 Ultimate."',
  icon: "/esoui/art/icons/passive_nightblade_006.dds",
  esoSkillId: 45048,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-assassination",
  skillType: "passive",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
