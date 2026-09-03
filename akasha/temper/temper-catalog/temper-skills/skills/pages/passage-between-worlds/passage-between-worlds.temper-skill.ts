import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const passageBetweenWorlds = {
  id: "019e6245-a6de-7a73-af15-feee03950e26",
  pageTypeSlug: "temper-skill",
  slug: "passage-between-worlds",
  title: "Passage Between Worlds",
  key: "passage-between-worlds",
  baseName: "Apocryphal Gate",
  description:
    '"Breach the world walls to create a portal at a target location. Its twin appears directly before you. Crossing the threshold allows you to teleport from one to the other for as long as the portals remain open. \\n\\nAllies standing within either portal can activate the Passage synergy, allowing them to teleport to the opposite portal.\\n\\nPassage Between Worlds generates Crux each time you teleport."',
  icon: "/esoui/art/icons/ability_arcanist_016_b.dds",
  esoSkillId: 40186220,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
