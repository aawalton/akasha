import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const undoMistake = {
  id: "01a0657d-031e-75d6-a94f-73b10826c80e",
  type: "page-type/world-skill",
  slug: "undo-mistake",
  title: "Undo Mistake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
