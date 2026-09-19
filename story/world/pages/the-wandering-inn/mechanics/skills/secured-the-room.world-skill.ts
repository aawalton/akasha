import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const securedTheRoom = {
  id: "01a0657d-02b8-7419-bd7d-90e283721bb9",
  type: "page-type/world-skill",
  slug: "secured-the-room",
  title: "Secured the Room",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
