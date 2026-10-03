import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherTamsinCleave = {
  id: "01a10364-98f2-766e-80be-5852289cb143",
  type: "page-type/character-skill",
  slug: "fairweather-tamsin-cleave",
  title: "Cleave",
  world: "world/fairweather",
  description:
    "The prose names no such skill; three skills at level 8 is a judgement, since the progression page says new skills come with levels and states no rate.",
  character: "character-other/fairweather-tamsin",
  skill: "world-skill/fairweather-cleave",
  unrevealed: true,
} as const satisfies CharacterSkill
