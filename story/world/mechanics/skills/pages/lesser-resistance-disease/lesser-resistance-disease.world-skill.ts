import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserResistanceDisease = {
  id: "01a06575-9823-7514-b832-0fbffd6bef99",
  type: "page-type/world-skill",
  slug: "lesser-resistance-disease",
  title: "Lesser Resistance: Disease",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
