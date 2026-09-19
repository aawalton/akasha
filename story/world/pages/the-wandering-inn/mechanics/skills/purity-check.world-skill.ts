import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const purityCheck = {
  id: "01a0657d-029a-7302-9659-28d4fae579ed",
  type: "page-type/world-skill",
  slug: "purity-check",
  title: "Purity Check",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
