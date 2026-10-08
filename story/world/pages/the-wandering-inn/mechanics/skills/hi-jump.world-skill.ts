import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hiJump = {
  id: "01a06575-981a-7daa-82be-6be9d3f5ab27",
  type: "page-type/world-skill",
  slug: "hi-jump",
  title: "Hi-Jump",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.602Z",
  updatedAt: "2026-09-22T13:32:27.000Z",
} as const satisfies WorldSkill
