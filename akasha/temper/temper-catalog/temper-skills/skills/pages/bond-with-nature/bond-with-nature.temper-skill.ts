import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bondWithNature = {
  id: "019e6245-a601-78d8-8c95-1b1c89574423",
  pageTypeSlug: "temper-skill",
  slug: "bond-with-nature",
  title: "Bond with Nature",
  key: "bond-with-nature",
  baseName: "Bond with Nature",
  description: '"Anytime one of your Animal Companion skills end, you are healed for 1530 Health."',
  icon: "/esoui/art/icons/passive_warden_010.dds",
  esoSkillId: 86065,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
