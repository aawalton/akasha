import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recallMemories = {
  id: "01a0657d-02a5-7c9b-b00a-6162a79ad4e2",
  type: "page-type/world-skill",
  slug: "recall-memories",
  title: "Recall Memories",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
