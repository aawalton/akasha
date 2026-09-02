import type { TemperSkill } from "../temper-skill.page-type.ts"

export const swordAndBoard = {
  id: "01a05fd1-d25c-7753-b394-7de274773861",
  pageTypeSlug: "temper-skill",
  slug: "sword-and-board",
  title: "Sword and Board",
  key: "sword-and-board",
  baseName: "Sword and Board",
  description:
    '"Increases your Weapon and Spell Damage by 5% and the amount of damage you can block by 20%."',
  icon: "/esoui/art/icons/ability_armor_014.dds",
  esoSkillId: 45452,
  isMorph: false,
  learnedLevel: 25,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "passive",
  subcategoryId: "weapon-one-hand-and-shield",
  status: "supported",
} as const satisfies TemperSkill
