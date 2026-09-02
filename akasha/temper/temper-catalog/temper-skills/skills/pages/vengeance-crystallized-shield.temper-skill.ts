import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceCrystallizedShield = {
  id: "01a05fd1-d294-73f9-9382-9a4a6abdde5b",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-crystallized-shield",
  title: "Vengeance Crystallized Shield",
  key: "vengeance-crystallized-shield",
  baseName: "Vengeance Crystallized Shield",
  description:
    '"Spin a shield of ice around you, absorbing up to |cffffff36225|r damage from projectiles for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_warden_002.dds",
  esoSkillId: 238089,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "active",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill
