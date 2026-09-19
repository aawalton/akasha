import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const guardsUp = {
  id: "01a06575-9817-7b81-870b-c393b33c991a",
  type: "page-type/world-skill",
  slug: "guards-up",
  title: "Guards Up",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
