import type { TemperSkill } from "../temper-skill.page-type.ts"

export const persistence = {
  id: "01a05fd1-2e0f-7e89-91c0-9725eb6e82fb",
  pageTypeSlug: "temper-skill",
  slug: "persistence",
  title: "Persistence",
  key: "persistence",
  baseName: "Persistence",
  description:
    '"After blocking an attack, your next Health, Magicka, or Stamina ability costs 18% less."',
  icon: "/esoui/art/icons/ability_sorcerer_054.dds",
  esoSkillId: 45165,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-dark-magic",
  skillType: "passive",
  subcategoryId: "sorcerer-dark-magic",
  status: "unsupported",
} as const satisfies TemperSkill
