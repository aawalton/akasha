import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const apocryphalGate = {
  id: "01a05fd0-434c-7b70-93b3-aa16091d14ba",
  pageTypeSlug: "temper-skill",
  slug: "apocryphal-gate",
  title: "Apocryphal Gate",
  key: "apocryphal-gate",
  baseName: "Apocryphal Gate",
  description:
    '"Breach the world walls to create a portal at a target location. Its twin appears directly before you. Crossing the threshold allows you to teleport from one to the other for as long as the portals remain open. \\n\\nApocryphal Gate generates Crux each time you teleport."',
  icon: "/esoui/art/icons/ability_arcanist_016.dds",
  esoSkillId: 183542,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
