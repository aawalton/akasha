import type { TemperSkill } from "../temper-skill.page-type.ts"

export const slaughter18929 = {
  id: "01a05fd1-7ccb-7792-9a5c-d9423dd8e876",
  pageTypeSlug: "temper-skill",
  slug: "slaughter-18929",
  title: "Slaughter",
  key: "slaughter-18929",
  baseName: "Slaughter",
  description:
    '"Increases damage with Dual Wield abilities by |cffffff10|r% against enemies with under |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_weapon_019.dds",
  esoSkillId: 18929,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
