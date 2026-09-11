import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fencing = {
  id: "01a06575-980c-7164-9d95-9cbe00bbef41",
  type: "world-skill",
  slug: "fencing",
  title: "Fencing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
