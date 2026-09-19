import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memorizeThat = {
  id: "01a0657d-024c-7504-aade-2c0b3f8eee8c",
  type: "page-type/world-skill",
  slug: "memorize-that",
  title: "Memorize That",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
