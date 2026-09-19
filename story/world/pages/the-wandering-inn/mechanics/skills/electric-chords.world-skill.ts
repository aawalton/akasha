import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const electricChords = {
  id: "01a06575-9807-7ee6-b2af-98ca172095b9",
  type: "page-type/world-skill",
  slug: "electric-chords",
  title: "Electric Chords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
