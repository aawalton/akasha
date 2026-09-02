import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const combatFrenzy = {
  id: "01a05fd0-4399-788b-99b3-bf4f84c5baa9",
  pageTypeSlug: "temper-skill",
  slug: "combat-frenzy",
  title: "Combat Frenzy",
  key: "combat-frenzy",
  baseName: "Combat Frenzy",
  description: '"You generate 20 Ultimate when you kill an enemy player."',
  icon: "/esoui/art/icons/ability_weapon_023.dds",
  esoSkillId: 45619,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "passive",
  subcategoryId: "alliance-war-assault",
  status: "unsupported",
} as const satisfies TemperSkill
