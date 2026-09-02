import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const balancedBlade = {
  id: "01a05fd0-4358-71b0-bd89-c05d69577182",
  pageTypeSlug: "temper-skill",
  slug: "balanced-blade",
  title: "Balanced Blade",
  key: "balanced-blade",
  baseName: "Balanced Blade",
  description: '"Reduces the Stamina cost of your Two-Handed abilities by 15%."',
  icon: "/esoui/art/icons/ability_dragonknight_028.dds",
  esoSkillId: 45443,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
