import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minorTelepathyAnts = {
  id: "01a0657d-024d-79b4-a172-099366c731f6",
  type: "page-type/world-skill",
  slug: "minor-telepathy-ants",
  title: "Minor Telepathy (Ants)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
