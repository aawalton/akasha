import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fourfoldReinforcement = {
  id: "01a06575-9810-77b7-9403-6ee998812df9",
  type: "page-type/world-skill",
  slug: "fourfold-reinforcement",
  title: "Fourfold Reinforcement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
