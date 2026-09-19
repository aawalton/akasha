import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elementalArrowShock = {
  id: "01a06575-9807-70ed-b1a6-141b99d052e1",
  type: "page-type/world-skill",
  slug: "elemental-arrow-shock",
  title: "Elemental Arrow: Shock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
