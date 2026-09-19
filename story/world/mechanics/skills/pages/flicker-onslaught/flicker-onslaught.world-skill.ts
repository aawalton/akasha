import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flickerOnslaught = {
  id: "01a06575-980e-7f3f-abe5-15f33614a202",
  type: "page-type/world-skill",
  slug: "flicker-onslaught",
  title: "Flicker Onslaught",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
