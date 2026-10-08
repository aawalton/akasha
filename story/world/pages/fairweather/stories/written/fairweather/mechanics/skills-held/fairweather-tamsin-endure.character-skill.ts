import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherTamsinEndure = {
  id: "01a10364-98f3-7ae3-be4c-c1bd997c5bbc",
  type: "page-type/character-skill",
  slug: "fairweather-tamsin-endure",
  title: "Endure",
  world: "world/fairweather",
  description:
    "The prose names no such skill; three skills at level 8 is a judgement, since the progression page says new skills come with levels and states no rate.",
  character: "character-other/fairweather-tamsin",
  skill: "world-skill/fairweather-endure",
  unrevealed: true,
  createdAt: "2026-10-03T20:11:26.835Z",
  updatedAt: "2026-10-03T20:11:29.000Z",
} as const satisfies CharacterSkill
