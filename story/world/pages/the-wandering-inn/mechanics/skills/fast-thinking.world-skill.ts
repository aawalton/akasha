import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastThinking = {
  id: "01a06575-980c-77ee-8ec3-6206f1412a28",
  type: "page-type/world-skill",
  slug: "fast-thinking",
  title: "Fast Thinking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
