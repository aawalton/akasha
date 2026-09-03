import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeOre = {
  id: "019e6224-cc9b-79ac-a944-00ed82b695bd",
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
