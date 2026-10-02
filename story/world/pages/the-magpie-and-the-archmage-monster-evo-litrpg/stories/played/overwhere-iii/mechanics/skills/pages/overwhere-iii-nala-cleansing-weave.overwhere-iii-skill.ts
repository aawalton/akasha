import type { OverwhereIiiSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/overwhere-iii-skill.page-type.types.ts"

export const overwhereIiiNalaCleansingWeave = {
  id: "01a0f213-a88e-7e8e-8cff-71c5cd38899c",
  type: "page-type/overwhere-iii-skill",
  slug: "overwhere-iii-nala-cleansing-weave",
  title: "Nala's Cleansing Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A thread of holy current drawn through blight, unpicking it strand by strand with a slow white-gold light.",
  character: "character-player/overwhere-iii-nala",
  skill: "world-skill/overwhere-iii-cleansing-weave",
  level: 2,
} as const satisfies OverwhereIiiSkill
