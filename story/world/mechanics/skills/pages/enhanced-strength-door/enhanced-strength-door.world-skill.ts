import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedStrengthDoor = {
  id: "01a06575-9808-75fa-91c6-b75dfa67d698",
  type: "page-type/world-skill",
  slug: "enhanced-strength-door",
  title: "Enhanced Strength: Door",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
