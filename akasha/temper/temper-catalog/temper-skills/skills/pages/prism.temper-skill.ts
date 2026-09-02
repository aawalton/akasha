import type { TemperSkill } from "../temper-skill.page-type.ts"

export const prism = {
  id: "01a05fd1-2e1c-7b52-bcd1-b571e90f2584",
  pageTypeSlug: "temper-skill",
  slug: "prism",
  title: "Prism",
  key: "prism",
  baseName: "Prism",
  description:
    '"Casting a Dawn\'s Wrath ability while in combat generates 3 Ultimate. This effect can occur once every 6 seconds."',
  icon: "/esoui/art/icons/ability_templar_031.dds",
  esoSkillId: 45216,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-dawns-wrath",
  skillType: "passive",
  subcategoryId: "templar-dawns-wrath",
  status: "unsupported",
} as const satisfies TemperSkill
