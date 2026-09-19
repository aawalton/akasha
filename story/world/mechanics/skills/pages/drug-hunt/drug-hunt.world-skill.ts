import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drugHunt = {
  id: "01a06575-9806-7ea3-9db4-4f2b434b7f0b",
  type: "page-type/world-skill",
  slug: "drug-hunt",
  title: "Drug Hunt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
