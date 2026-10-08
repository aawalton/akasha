import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonAberration = {
  id: "01a0657d-02fe-7f8b-a36f-b9ff877de620",
  type: "page-type/world-skill",
  slug: "summon-aberration",
  title: "Summon Aberration",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.718Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
