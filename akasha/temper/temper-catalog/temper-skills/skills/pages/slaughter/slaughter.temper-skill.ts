import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const slaughter = {
  id: "019e6226-0115-76f0-80a8-47b15d4a2118",
  pageTypeSlug: "temper-skill",
  slug: "slaughter",
  title: "Slaughter",
  key: "slaughter",
  baseName: "Slaughter",
  description:
    '"Increases damage with Dual Wield abilities by 20% against enemies with under 25% Health."',
  icon: "/esoui/art/icons/ability_weapon_019.dds",
  esoSkillId: 45476,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
