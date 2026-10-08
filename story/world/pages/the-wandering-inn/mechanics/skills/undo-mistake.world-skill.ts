import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const undoMistake = {
  id: "01a0657d-031e-75d6-a94f-73b10826c80e",
  type: "page-type/world-skill",
  slug: "undo-mistake",
  title: "Undo Mistake",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.750Z",
  updatedAt: "2026-09-22T13:33:42.000Z",
} as const satisfies WorldSkill
