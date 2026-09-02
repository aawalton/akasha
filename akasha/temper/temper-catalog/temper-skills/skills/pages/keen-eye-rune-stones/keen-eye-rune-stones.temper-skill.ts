import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeRuneStones = {
  id: "01a05fd0-dcce-799a-9760-482316dece60",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-rune-stones",
  title: "Keen Eye: Rune Stones",
  key: "keen-eye-rune-stones",
  baseName: "Keen Eye: Rune Stones",
  description: '"Runes in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47853,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
