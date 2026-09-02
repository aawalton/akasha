import type { TemperSkill } from "../temper-skill.page-type.ts"

export const magickaMastery = {
  id: "01a05fd1-2df3-74dd-8629-629d66f5ffa1",
  pageTypeSlug: "temper-skill",
  slug: "magicka-mastery",
  title: "Magicka Mastery",
  key: "magicka-mastery",
  baseName: "Magicka Mastery",
  description: '"Reduces the Magicka cost of your abilities by 7%."',
  icon: "/esoui/art/icons/ability_armor_005.dds",
  esoSkillId: 45264,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
