import type { TemperSkill } from "../temper-skill.page-type.ts"

export const keenEyeDigSites = {
  id: "01a05fd0-dccc-7a19-8f8e-8be3b7d8a801",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-dig-sites",
  title: "Keen Eye: Dig Sites",
  key: "keen-eye-dig-sites",
  baseName: "Keen Eye: Dig Sites",
  description: '"Antiquity Dig Sites will be easier to see when you are 30 meters or closer."',
  icon: "/esoui/art/icons/ability_scrying_08b.dds",
  esoSkillId: 140174,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
