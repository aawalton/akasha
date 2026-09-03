import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const prism = {
  id: "019e6245-a6f1-70c5-9743-f32b22c6e76f",
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
