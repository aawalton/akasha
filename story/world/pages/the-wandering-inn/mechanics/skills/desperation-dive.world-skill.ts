import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const desperationDive = {
  id: "01a06575-9803-7843-ad10-d9b32114d74b",
  type: "page-type/world-skill",
  slug: "desperation-dive",
  title: "Desperation Dive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
