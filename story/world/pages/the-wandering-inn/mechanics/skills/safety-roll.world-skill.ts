import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const safetyRoll = {
  id: "01a0657d-02b7-7d6b-82c1-24756ab60ab9",
  type: "page-type/world-skill",
  slug: "safety-roll",
  title: "Safety Roll",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.647Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
