import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const paralysisCut = {
  id: "01a0657d-0286-7193-98e7-3bf211aa7215",
  type: "page-type/world-skill",
  slug: "paralysis-cut",
  title: "Paralysis Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
