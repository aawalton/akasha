import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heroicToleranceAlcohol = {
  id: "01a06575-9819-7425-8081-ac97693d9655",
  type: "page-type/world-skill",
  slug: "heroic-tolerance-alcohol",
  title: "Heroic Tolerance: Alcohol",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
