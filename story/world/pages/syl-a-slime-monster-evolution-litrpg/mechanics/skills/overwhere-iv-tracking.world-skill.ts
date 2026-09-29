import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvTracking = {
  id: "01a0ed30-cadd-7c80-a212-21fd2aebe46d",
  type: "page-type/world-skill",
  slug: "overwhere-iv-tracking",
  title: "Tracking",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The craft of reading and following the trail a creature leaves.",
} as const satisfies WorldSkill
