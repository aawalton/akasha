import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceApocryphalGate = {
  id: "019e6f53-a8af-7e35-b7c1-37a9812e054e",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-apocryphal-gate",
  title: "Vengeance Apocryphal Gate",
  key: "vengeance-apocryphal-gate",
  baseName: "Vengeance Apocryphal Gate",
  description:
    '"Breach the world walls to create a portal at a target location, teleporting yourself to it immediately and generating Crux."',
  icon: "/esoui/art/icons/ability_arcanist_016.dds",
  esoSkillId: 238545,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
