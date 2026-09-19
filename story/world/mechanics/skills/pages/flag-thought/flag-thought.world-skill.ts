import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flagThought = {
  id: "01a06575-980d-70ed-bd6b-2e5a5936bc1a",
  type: "page-type/world-skill",
  slug: "flag-thought",
  title: "Flag Thought",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
