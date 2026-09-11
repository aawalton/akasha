import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bikeHop = {
  id: "01a06575-97f5-7f3a-bf94-049c8b08dc33",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "bike-hop",
  title: "Bike Hop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
