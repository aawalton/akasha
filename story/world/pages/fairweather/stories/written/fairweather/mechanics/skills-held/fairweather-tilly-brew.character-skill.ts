import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherTillyBrew = {
  id: "01a10364-98f3-77e1-b6f1-1fcf033e8b41",
  type: "page-type/character-skill",
  slug: "fairweather-tilly-brew",
  title: "Brew",
  world: "world/fairweather",
  description:
    "The prose names no such skill; two skills at level 2 is a judgement, since the progression page says new skills come with levels and states no rate.",
  character: "character-other/fairweather-tilly",
  skill: "world-skill/fairweather-brew",
  unrevealed: true,
} as const satisfies CharacterSkill
