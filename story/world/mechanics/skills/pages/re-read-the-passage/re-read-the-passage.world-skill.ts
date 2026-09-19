import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reReadThePassage = {
  id: "01a0657d-02a5-76aa-a1ce-6c3cbaa3d4ef",
  type: "page-type/world-skill",
  slug: "re-read-the-passage",
  title: "Re-read the Passage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
