import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const fairweatherTamsinFrenzy = {
  id: "01a10364-98f3-7e5f-9fcf-cf94fe99ff03",
  type: "page-type/character-skill",
  slug: "fairweather-tamsin-frenzy",
  title: "Frenzy",
  world: "world/fairweather",
  character: "character-other/fairweather-tamsin",
  skill: "world-skill/fairweather-frenzy",
  unrevealed: false,
} as const satisfies CharacterSkill
