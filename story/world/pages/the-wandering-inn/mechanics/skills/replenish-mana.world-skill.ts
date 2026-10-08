import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const replenishMana = {
  id: "01a0657d-02b0-740b-a309-a801fe1cf8b3",
  type: "page-type/world-skill",
  slug: "replenish-mana",
  title: "Replenish Mana",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.640Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
