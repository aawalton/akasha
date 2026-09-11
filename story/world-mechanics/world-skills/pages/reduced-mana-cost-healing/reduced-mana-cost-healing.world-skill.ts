import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const reducedManaCostHealing = {
  id: "01a0657d-02a6-7e69-b3c5-275da0d08901",
  type: "world-skill",
  slug: "reduced-mana-cost-healing",
  title: "Reduced Mana Cost: Healing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
