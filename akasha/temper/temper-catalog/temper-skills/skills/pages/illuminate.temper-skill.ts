import type { TemperSkill } from "../temper-skill.page-type.ts"

export const illuminate = {
  id: "01a05fd0-dcbd-7318-b590-b740f840b264",
  pageTypeSlug: "temper-skill",
  slug: "illuminate",
  title: "Illuminate",
  key: "illuminate",
  baseName: "Illuminate",
  description:
    '"Casting a Dawn\'s Wrath ability grants Minor Sorcery to you and your group for 20 seconds, increasing your Spell Damage by 10%."',
  icon: "/esoui/art/icons/ability_templar_012.dds",
  esoSkillId: 45215,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-dawns-wrath",
  skillType: "passive",
  subcategoryId: "templar-dawns-wrath",
  status: "unsupported",
} as const satisfies TemperSkill
