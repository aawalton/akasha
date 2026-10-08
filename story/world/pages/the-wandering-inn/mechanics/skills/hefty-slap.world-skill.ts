import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heftySlap = {
  id: "01a06575-9819-755c-afd9-6a1e79dd39ce",
  type: "page-type/world-skill",
  slug: "hefty-slap",
  title: "Hefty Slap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.601Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
