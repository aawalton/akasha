import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restoringSpirit31721 = {
  id: "01a05fd1-7c94-7e69-9540-1b976ccd318a",
  pageTypeSlug: "temper-skill",
  slug: "restoring-spirit-31721",
  title: "Restoring Spirit",
  key: "restoring-spirit-31721",
  baseName: "Restoring Spirit",
  description:
    '"Reduces the Health, Magicka, Stamina, and Ultimate costs of your abilities by |cffffff2|r%."',
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 31721,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "templar-dawns-wrath",
  skillType: "passive",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
