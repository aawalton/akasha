import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaWells = {
  id: "01a0657d-0242-7490-97f6-a8c37a5efda0",
  type: "page-type/world-skill",
  slug: "mana-wells",
  title: "Mana Wells",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.530Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
