import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hailOfArrows = {
  id: "01a06575-9818-76d2-bf34-beaeb935dc8b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hail-of-arrows",
  title: "Hail of Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
