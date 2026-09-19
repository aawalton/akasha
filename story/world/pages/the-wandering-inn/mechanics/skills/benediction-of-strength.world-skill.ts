import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const benedictionOfStrength = {
  id: "01a06575-97f5-7e4c-a926-5e55844f68e5",
  type: "page-type/world-skill",
  slug: "benediction-of-strength",
  title: "Benediction of Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
