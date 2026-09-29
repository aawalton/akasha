import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvSpatialSense = {
  id: "01a0ed2b-3868-7e94-951a-5882cfbc397d",
  type: "page-type/world-skill",
  slug: "overwhere-iv-spatial-sense",
  title: "Spatial Sense",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A sense of Dimension Magic: the felt shape of every body and hollow in the space nearby.",
  manaCost: 0,
  durationMinutes: 0,
} as const satisfies WorldSkill
