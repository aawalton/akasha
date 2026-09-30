import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiSpark = {
  id: "01a0f181-909e-7d65-95c2-039683714a47",
  type: "page-type/world-skill",
  slug: "overwhere-iii-spark",
  title: "Spark",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "A small flame kindled at the fingertip, enough to light a wick or dry tinder.",
  manaCost: 1,
  durationMinutes: 1,
} as const satisfies WorldSkill
