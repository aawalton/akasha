import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const toughCarapace = {
  id: "01a0657d-0315-7961-83cb-814ef5eb5d81",
  type: "page-type/world-skill",
  slug: "tough-carapace",
  title: "Tough Carapace",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.741Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
