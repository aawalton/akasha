import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spearWall = {
  id: "019e6245-a73e-7310-b09d-48560670abaa",
  pageTypeSlug: "temper-skill",
  slug: "spear-wall",
  title: "Spear Wall",
  key: "spear-wall",
  baseName: "Spear Wall",
  description:
    '"Gain Minor Berserk and Minor Protection for 6 seconds, increasing damage done and reducing damage taken by 5%."',
  icon: "/esoui/art/icons/ability_templar_027.dds",
  esoSkillId: 44721,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-aedric-spear",
  skillType: "passive",
  subcategoryId: "templar-aedric-spear",
  status: "unsupported",
} as const satisfies TemperSkill
