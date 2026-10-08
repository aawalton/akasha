import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reducedManaCostHealing = {
  id: "01a0657d-02a6-7e69-b3c5-275da0d08901",
  type: "page-type/world-skill",
  slug: "reduced-mana-cost-healing",
  title: "Reduced Mana Cost: Healing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.630Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
