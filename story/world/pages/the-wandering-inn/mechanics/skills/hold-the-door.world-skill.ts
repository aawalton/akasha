import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holdTheDoor = {
  id: "01a06575-981a-75e5-aac3-f9bff904813f",
  type: "page-type/world-skill",
  slug: "hold-the-door",
  title: "Hold the Door",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.602Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
