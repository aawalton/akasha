import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elementalSuppressionAir = {
  id: "01a06575-9807-78e3-b1b6-54fd4d99757b",
  type: "page-type/world-skill",
  slug: "elemental-suppression-air",
  title: "Elemental Suppression: Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
