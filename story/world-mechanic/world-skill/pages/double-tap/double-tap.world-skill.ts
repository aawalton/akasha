import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const doubleTap = {
  id: "01a06575-9805-765e-9051-380c4b714c2f",
  type: "world-skill",
  slug: "double-tap",
  title: "Double Tap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
