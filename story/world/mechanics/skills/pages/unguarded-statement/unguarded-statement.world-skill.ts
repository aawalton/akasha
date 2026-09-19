import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unguardedStatement = {
  id: "01a0657d-031e-7fdd-9ab7-e55453865bf8",
  type: "page-type/world-skill",
  slug: "unguarded-statement",
  title: "Unguarded Statement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
