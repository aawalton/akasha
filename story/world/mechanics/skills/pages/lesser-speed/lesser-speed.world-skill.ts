import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserSpeed = {
  id: "01a06575-9823-7ed0-87a7-4e6ed2e9aa76",
  type: "page-type/world-skill",
  slug: "lesser-speed",
  title: "Lesser Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
