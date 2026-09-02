import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeCloth = {
  id: "01a05fd0-dccb-7193-8c7c-c96268429961",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-cloth",
  title: "Keen Eye: Cloth",
  key: "keen-eye-cloth",
  baseName: "Keen Eye: Cloth",
  description:
    '"Fibrous plants in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47862,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
