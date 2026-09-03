import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const illuminate = {
  id: "019e6245-a6ae-73a6-9d83-bcaddfa4e855",
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
