import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvRiftBeacon = {
  id: "01a0ed2b-3868-78b4-8441-214e98404e91",
  type: "page-type/world-skill",
  slug: "overwhere-iv-rift-beacon",
  title: "Rift Beacon",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A spell of Dimension Magic: a fixed mark in space that a rift can later open onto.",
  manaCost: 15,
  durationMinutes: 0,
} as const satisfies WorldSkill
