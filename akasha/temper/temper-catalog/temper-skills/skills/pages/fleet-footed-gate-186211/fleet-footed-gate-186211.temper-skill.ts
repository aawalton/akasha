import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fleetFootedGate186211 = {
  id: "019e6f53-a20f-79fb-aba8-0a1dd2b0bdb9",
  pageTypeSlug: "temper-skill",
  slug: "fleet-footed-gate-186211",
  title: "Fleet-Footed Gate",
  key: "fleet-footed-gate-186211",
  baseName: "Apocryphal Gate",
  description:
    '"Breach the world walls to create a portal at a target location. Its twin appears directly before you. Crossing the threshold allows you to teleport from one to the other for as long as the portals remain open. \\n\\nAfter teleporting, you gain Major Expedition for |cffffff5|r seconds, increasing your Movement Speed by |cffffff30|r%.\\n\\nFleet-Footed Gate generates Crux each time you teleport."',
  icon: "/esoui/art/icons/ability_arcanist_016_a.dds",
  esoSkillId: 186211,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
