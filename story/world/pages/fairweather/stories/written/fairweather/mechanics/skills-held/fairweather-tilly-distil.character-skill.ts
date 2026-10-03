import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherTillyDistil = {
  id: "01a10364-98f3-7684-8c62-3c2f8defc3c4",
  type: "page-type/character-skill",
  slug: "fairweather-tilly-distil",
  title: "Distil",
  world: "world/fairweather",
  description:
    "The prose names no such skill; two skills at level 2 is a judgement, since the progression page says new skills come with levels and states no rate.",
  character: "character-other/fairweather-tilly",
  skill: "world-skill/fairweather-distil",
  unrevealed: true,
} as const satisfies CharacterSkill
