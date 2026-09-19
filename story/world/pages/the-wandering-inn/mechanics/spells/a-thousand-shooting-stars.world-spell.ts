import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const aThousandShootingStars = {
  id: "01a06572-95b2-71c5-8c58-65050905f48a",
  type: "page-type/world-spell",
  slug: "a-thousand-shooting-stars",
  title: "A Thousand Shooting Stars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
