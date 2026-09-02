import type { TemperSkill } from "../temper-skill.page-type.ts"

export const fleetFootedGate = {
  id: "01a05fd0-dc8e-730b-98f1-d5c8ff85c7d4",
  pageTypeSlug: "temper-skill",
  slug: "fleet-footed-gate",
  title: "Fleet-Footed Gate",
  key: "fleet-footed-gate",
  baseName: "Apocryphal Gate",
  description:
    '"Breach the world walls to create a portal at a target location. Its twin appears directly before you. Crossing the threshold allows you to teleport from one to the other for as long as the portals remain open. \\n\\nAfter teleporting, you gain Major Expedition for 5 seconds, increasing your Movement Speed by 30%.\\n\\nFleet-Footed Gate generates Crux each time you teleport."',
  icon: "/esoui/art/icons/ability_arcanist_016_a.dds",
  esoSkillId: 40186211,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
