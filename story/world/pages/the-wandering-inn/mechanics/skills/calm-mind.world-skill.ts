import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const calmMind = {
  id: "01a06575-97fa-7212-a8b9-6834ea2911ab",
  type: "page-type/world-skill",
  slug: "calm-mind",
  title: "Calm Mind",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
