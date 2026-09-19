import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTravelling = {
  id: "01a06575-980c-75e9-86a3-ad01fc3d3319",
  type: "page-type/world-skill",
  slug: "fast-travelling",
  title: "Fast Travelling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
