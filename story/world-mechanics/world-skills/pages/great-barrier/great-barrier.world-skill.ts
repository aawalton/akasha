import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greatBarrier = {
  id: "01a06575-9816-78fa-9bb2-b002197cdcd9",
  type: "world-skill",
  slug: "great-barrier",
  title: "Great Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
