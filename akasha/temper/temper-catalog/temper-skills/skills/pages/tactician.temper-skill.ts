import type { TemperSkill } from "../temper-skill.page-type.ts"

export const tactician = {
  id: "01a05fd1-d25e-7d98-b2f4-f88e966fa2ca",
  pageTypeSlug: "temper-skill",
  slug: "tactician",
  title: "Tactician",
  key: "tactician",
  baseName: "Tactician",
  description:
    '"Increases your damage done with Siege Weapons to Keeps and other Siege Weapons while in your campaign, depending on how many Home Keeps you own.\\n\\n1 or less Keep: 50%\\n2 Keeps: 60%\\n3 Keeps: 70%\\n4 Keeps: 80%\\n5 Keeps: 90%\\n6 Keeps: 100%"',
  icon: "/esoui/art/icons/ability_sorcerer_057.dds",
  esoSkillId: 39647,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-emperor",
  skillType: "passive",
  subcategoryId: "alliance-war-emperor",
  status: "unsupported",
} as const satisfies TemperSkill
