import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const enduringRays = {
  id: "019e6245-a669-781b-87db-a3f22f3cb9c5",
  pageTypeSlug: "temper-skill",
  slug: "enduring-rays",
  title: "Enduring Rays",
  key: "enduring-rays",
  baseName: "Enduring Rays",
  description:
    '"Increases the duration of your Sun Fire, Eclipse, Solar Flare, and Nova abilities by 2 seconds."',
  icon: "/esoui/art/icons/ability_templar_020.dds",
  esoSkillId: 45214,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-dawns-wrath",
  skillType: "passive",
  subcategoryId: "templar-dawns-wrath",
  status: "unsupported",
} as const satisfies TemperSkill
