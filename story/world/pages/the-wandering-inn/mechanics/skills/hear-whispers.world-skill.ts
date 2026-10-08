import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hearWhispers = {
  id: "01a06575-9819-7bf4-9750-623ff97a5b05",
  type: "page-type/world-skill",
  slug: "hear-whispers",
  title: "Hear Whispers",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
