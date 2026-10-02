import type { OverwhereIiiSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/overwhere-iii-skill.page-type.types.ts"

export const overwhereIiiNalaBraidWeaving = {
  id: "01a0fde2-1dc6-7df3-b39d-fa18ef68f4c5",
  type: "page-type/overwhere-iii-skill",
  slug: "overwhere-iii-nala-braid-weaving",
  title: "Nala's Braid Weaving",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "Twining a weave onto a lent current, so the weave rides the current to where it is sent.",
  character: "character-player/overwhere-iii-nala",
  skill: "world-skill/overwhere-iii-braid-weaving",
  level: 1,
} as const satisfies OverwhereIiiSkill
