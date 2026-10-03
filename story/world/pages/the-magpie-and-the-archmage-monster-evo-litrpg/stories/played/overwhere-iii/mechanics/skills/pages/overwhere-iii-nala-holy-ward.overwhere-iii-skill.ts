import type { OverwhereIiiSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/overwhere-iii-skill.page-type.types.ts"

export const overwhereIiiNalaHolyWard = {
  id: "01a101cb-02ae-762c-928a-d09ace2a7583",
  type: "page-type/overwhere-iii-skill",
  slug: "overwhere-iii-nala-holy-ward",
  title: "Nala's Holy Ward",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A thin shimmer of white-gold current woven close over her skin, turning blows and blight.",
  character: "character-player/overwhere-iii-nala",
  skill: "world-skill/overwhere-iii-holy-ward",
  level: 1,
} as const satisfies OverwhereIiiSkill
