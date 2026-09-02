import type { TemperSkill } from "../temper-skill.page-type.ts"

export const undo = {
  id: "01a05fd1-d27c-7eed-b501-78178850fe95",
  pageTypeSlug: "temper-skill",
  slug: "undo",
  title: "Undo",
  key: "undo",
  baseName: "Undo",
  description:
    '"Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were |cffffff4|r seconds ago."',
  icon: "/esoui/art/icons/ability_psijic_001.dds",
  esoSkillId: 103478,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "guild-psijic-order",
  skillType: "ultimate",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
