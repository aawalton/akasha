import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shareMyEnd = {
  id: "01a0657d-02bf-70ff-a7b2-92313444c1d0",
  type: "page-type/world-skill",
  slug: "share-my-end",
  title: "Share My End",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
