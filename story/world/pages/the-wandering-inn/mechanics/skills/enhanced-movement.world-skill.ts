import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedMovement = {
  id: "01a06575-9808-7276-a884-ce1be3c9b397",
  type: "page-type/world-skill",
  slug: "enhanced-movement",
  title: "Enhanced Movement",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
