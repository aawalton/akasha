import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elementalQuickDraw = {
  id: "01a06575-9807-79c3-bf3a-41baf2f86207",
  type: "page-type/world-skill",
  slug: "elemental-quick-draw",
  title: "Elemental Quick-Draw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
