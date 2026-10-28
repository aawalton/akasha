import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const apocryphalGate = {
  id: "019e6f53-9eb8-7fa0-bf6a-3477e431db84",
  type: "page-type/temper-skill",
  slug: "apocryphal-gate",
  title: "Apocryphal Gate",
  key: "apocryphal-gate",
  baseName: "Apocryphal Gate",
  description:
    "Breach the world walls to create a portal at a target location. Its twin appears directly before you. Crossing the threshold allows you to teleport from one to the other for as long as the portals remain open. \n\nApocryphal Gate generates Crux each time you teleport.",
  icon: "/esoui/art/icons/ability_arcanist_016.dds",
  esoAbilityId: 183542,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 41,
  createdAt: "2026-05-28T16:03:31.640Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
