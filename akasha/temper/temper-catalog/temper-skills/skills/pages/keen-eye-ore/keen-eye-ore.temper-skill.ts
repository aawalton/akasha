import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeOre = {
  id: "01a05fd0-dccd-748a-ba76-4df63f30a5c3",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-ore",
  title: "Keen Eye: Ore",
  key: "keen-eye-ore",
  baseName: "Keen Eye: Ore",
  description: '"Ore in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47856,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
