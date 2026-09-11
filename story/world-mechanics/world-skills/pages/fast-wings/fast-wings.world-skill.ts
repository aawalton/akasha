import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastWings = {
  id: "01a06575-980c-7f9c-9201-700754768606",
  type: "world-skill",
  slug: "fast-wings",
  title: "Fast Wings",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
