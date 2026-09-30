import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvSpatialSense = {
  id: "01a0ed2b-3868-7e94-951a-5882cfbc397d",
  type: "page-type/world-skill",
  slug: "overwhere-iv-spatial-sense",
  title: "Spatial Sense",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A sense of space: the shape of every body and hollow a few paces around her, felt without looking.",
  manaCost: 2,
  durationMinutes: 1,
} as const satisfies WorldSkill
