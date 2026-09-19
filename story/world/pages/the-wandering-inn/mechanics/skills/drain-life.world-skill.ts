import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drainLife = {
  id: "01a06575-9805-7537-a528-149c973b606b",
  type: "page-type/world-skill",
  slug: "drain-life",
  title: "Drain Life",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
