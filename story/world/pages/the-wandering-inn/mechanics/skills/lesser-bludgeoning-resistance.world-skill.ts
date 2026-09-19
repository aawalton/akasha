import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserBludgeoningResistance = {
  id: "01a06575-9822-74e2-8221-6c6207c61320",
  type: "page-type/world-skill",
  slug: "lesser-bludgeoning-resistance",
  title: "Lesser Bludgeoning Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
