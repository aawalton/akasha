import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cancelThat = {
  id: "01a06575-97fa-7dcb-b88a-3adef4a41579",
  type: "page-type/world-skill",
  slug: "cancel-that",
  title: "Cancel That",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
