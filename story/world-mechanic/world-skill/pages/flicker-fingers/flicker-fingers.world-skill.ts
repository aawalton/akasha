import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const flickerFingers = {
  id: "01a06575-980e-77b0-b944-b07ce0f65454",
  type: "world-skill",
  slug: "flicker-fingers",
  title: "Flicker Fingers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
