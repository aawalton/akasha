import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonReinforcements = {
  id: "01a0657d-02fe-74e5-bb07-d3b77282621e",
  type: "page-type/world-skill",
  slug: "summon-reinforcements",
  title: "Summon Reinforcements",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.718Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
