import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const giantSSword = {
  id: "01a06575-9815-7274-bde4-5a26c8a522f8",
  type: "world-skill",
  slug: "giant-s-sword",
  title: "Giant’s Sword",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
