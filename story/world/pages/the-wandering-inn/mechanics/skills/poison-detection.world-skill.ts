import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const poisonDetection = {
  id: "01a0657d-0295-7a56-8d91-f92cecf77267",
  type: "page-type/world-skill",
  slug: "poison-detection",
  title: "Poison Detection",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.613Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
