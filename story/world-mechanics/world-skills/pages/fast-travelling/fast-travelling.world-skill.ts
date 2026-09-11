import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastTravelling = {
  id: "01a06575-980c-75e9-86a3-ad01fc3d3319",
  type: "world-skill",
  slug: "fast-travelling",
  title: "Fast Travelling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
