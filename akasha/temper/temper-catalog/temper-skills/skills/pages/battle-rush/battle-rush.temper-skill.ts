import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const battleRush = {
  id: "019e6226-00d4-7947-bd31-ad150c9e4805",
  pageTypeSlug: "temper-skill",
  slug: "battle-rush",
  title: "Battle Rush",
  key: "battle-rush",
  baseName: "Battle Rush",
  description: '"Increases your Stamina Recovery by 30% for 10 seconds after killing a target."',
  icon: "/esoui/art/icons/ability_weapon_021.dds",
  esoSkillId: 45448,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 41,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
