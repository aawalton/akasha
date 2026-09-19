import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedRead = {
  id: "01a0657d-02ed-73af-8b62-6dc994fe46a2",
  type: "page-type/world-skill",
  slug: "speed-read",
  title: "Speed Read",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
