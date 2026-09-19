import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowPresence = {
  id: "01a0657d-02bf-7df1-96f5-b1642e3afdef",
  type: "page-type/world-skill",
  slug: "shadow-presence",
  title: "Shadow Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
