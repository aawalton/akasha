import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const metabolicBoost = {
  id: "01a0657d-024c-7435-bbe1-768b7b3b603b",
  type: "page-type/world-skill",
  slug: "metabolic-boost",
  title: "Metabolic Boost",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.540Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
