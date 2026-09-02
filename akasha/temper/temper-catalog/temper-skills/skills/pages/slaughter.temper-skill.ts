import type { TemperSkill } from "../temper-skill.page-type.ts"

export const slaughter = {
  id: "01a05fd1-7cca-7e6e-862d-14d38063ed06",
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
} as const satisfies TemperSkill
