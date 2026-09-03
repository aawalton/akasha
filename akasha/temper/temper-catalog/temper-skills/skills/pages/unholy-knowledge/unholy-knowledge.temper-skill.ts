import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unholyKnowledge = {
  id: "019e6245-a759-7e89-97d7-3d7b2add03ab",
  pageTypeSlug: "temper-skill",
  slug: "unholy-knowledge",
  title: "Unholy Knowledge",
  key: "unholy-knowledge",
  baseName: "Unholy Knowledge",
  description:
    '"Reduces the Health, Magicka, and Stamina costs of your non Core Combat abilities by 6%."',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 45176,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-dark-magic",
  skillType: "passive",
  subcategoryId: "sorcerer-dark-magic",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
