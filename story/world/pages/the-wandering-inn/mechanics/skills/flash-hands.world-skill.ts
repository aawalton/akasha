import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashHands = {
  id: "01a06575-980d-74cc-9426-20cf7dc6e52a",
  type: "page-type/world-skill",
  slug: "flash-hands",
  title: "Flash Hands",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
