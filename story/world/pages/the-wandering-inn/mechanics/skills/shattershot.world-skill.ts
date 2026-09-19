import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shattershot = {
  id: "01a0657d-02bf-78bb-b634-4561186d2e41",
  type: "page-type/world-skill",
  slug: "shattershot",
  title: "Shattershot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
