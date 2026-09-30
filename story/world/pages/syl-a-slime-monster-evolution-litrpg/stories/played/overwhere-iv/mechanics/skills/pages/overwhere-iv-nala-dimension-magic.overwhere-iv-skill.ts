import type { OverwhereIvSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/overwhere-iv-skill.page-type.types.ts"

export const overwhereIvNalaDimensionMagic = {
  id: "01a0ed1c-3923-7edd-ba55-7a1084277824",
  type: "page-type/overwhere-iv-skill",
  slug: "overwhere-iv-nala-dimension-magic",
  title: "Dimension Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Magic that folds space, shifting a thing straight toward her or away from her.",
  character: "character-player/overwhere-iv-nala",
  skill: "world-skill/overwhere-iv-dimension-magic",
  level: 1,
  reachPaces: 20,
  manaCost: 5,
  durationMinutes: 0,
} as const satisfies OverwhereIvSkill
