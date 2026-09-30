import type { OverwhereIvSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/overwhere-iv-skill.page-type.types.ts"

export const overwhereIvNalaSpatialSense = {
  id: "01a0f394-5bbd-776a-823a-e1956a7f8177",
  type: "page-type/overwhere-iv-skill",
  slug: "overwhere-iv-nala-spatial-sense",
  title: "Spatial Sense",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A sense of Dimension Magic: the felt shape of every body and hollow nearby. It is always on within five paces, and reached for out to the magic's full reach.",
  character: "character-player/overwhere-iv-nala",
  skill: "world-skill/overwhere-iv-spatial-sense",
  level: 1,
  reachPaces: 40,
  manaCost: 2,
  durationMinutes: 1,
} as const satisfies OverwhereIvSkill
