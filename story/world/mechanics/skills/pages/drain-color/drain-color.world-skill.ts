import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drainColor = {
  id: "01a06575-9805-7164-88c4-91d8e0b4d990",
  type: "page-type/world-skill",
  slug: "drain-color",
  title: "Drain Color",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
