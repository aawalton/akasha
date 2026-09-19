import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallMemory = {
  id: "01a0657d-02a5-7aea-85cb-97fb11ee47f7",
  type: "page-type/world-skill",
  slug: "recall-memory",
  title: "Recall Memory",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
