import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ruleOfCombat = {
  id: "01a0657d-02b7-71ac-9e95-2a2072f64813",
  type: "page-type/world-skill",
  slug: "rule-of-combat",
  title: "Rule of Combat",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.647Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
