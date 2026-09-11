import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const drainLife = {
  id: "01a06575-9805-7537-a528-149c973b606b",
  type: "world-skill",
  slug: "drain-life",
  title: "Drain Life",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
