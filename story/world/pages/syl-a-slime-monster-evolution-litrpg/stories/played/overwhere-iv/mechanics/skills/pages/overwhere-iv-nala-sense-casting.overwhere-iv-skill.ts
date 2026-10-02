import type { OverwhereIvSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/overwhere-iv-skill.page-type.types.ts"

export const overwhereIvNalaSenseCasting = {
  id: "01a0fdca-c133-7121-bd34-7c271a1d3f10",
  type: "page-type/overwhere-iv-skill",
  slug: "overwhere-iv-nala-sense-casting",
  title: "Sense Casting",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Aiming a spell at a spot felt through Spatial Sense rather than seen.",
  character: "character-player/overwhere-iv-nala",
  skill: "world-skill/overwhere-iv-sense-casting",
  level: 1,
  uses: 0,
  unrevealed: false,
} as const satisfies OverwhereIvSkill
