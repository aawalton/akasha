import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiMendingWeave = {
  id: "01a0f1e6-8459-7d38-a739-8bfe8a72e0dd",
  type: "page-type/world-skill",
  slug: "overwhere-iii-mending-weave",
  title: "Mending Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A thread of holy current stitched into a wound, closing it slowly with a warm white-gold light.",
  manaCost: 2,
  durationMinutes: 5,
} as const satisfies WorldSkill
