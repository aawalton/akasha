import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eightfoldVolley = {
  id: "01a06575-9807-758e-b8bb-3507673d9f3a",
  type: "page-type/world-skill",
  slug: "eightfold-volley",
  title: "Eightfold Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
