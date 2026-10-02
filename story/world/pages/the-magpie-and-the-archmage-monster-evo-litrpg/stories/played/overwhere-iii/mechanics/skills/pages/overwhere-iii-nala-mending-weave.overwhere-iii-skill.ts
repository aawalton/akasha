import type { OverwhereIiiSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/overwhere-iii-skill.page-type.types.ts"

export const overwhereIiiNalaMendingWeave = {
  id: "01a0f1e7-d291-70c4-8515-71a49a2da945",
  type: "page-type/overwhere-iii-skill",
  slug: "overwhere-iii-nala-mending-weave",
  title: "Nala's Mending Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A thread of holy current stitched into a wound, closing it slowly with a warm white-gold light.",
  character: "character-player/overwhere-iii-nala",
  skill: "world-skill/overwhere-iii-mending-weave",
  level: 2,
} as const satisfies OverwhereIiiSkill
