import type { TemperSkill } from "../temper-skill.page-type.ts"

export const deathGleaning116230 = {
  id: "01a05fd0-8e00-72ef-a990-1ff909de484c",
  pageTypeSlug: "temper-skill",
  slug: "death-gleaning-116230",
  title: "Death Gleaning",
  key: "death-gleaning-116230",
  baseName: "Death Gleaning",
  description:
    '"Whenever an enemy you are in combat with dies within |cffffff28|r meters of you, restore |cffffff333|r Magicka and Stamina."',
  icon: "/esoui/art/icons/passive_necromancer_005.dds",
  esoSkillId: 116230,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
