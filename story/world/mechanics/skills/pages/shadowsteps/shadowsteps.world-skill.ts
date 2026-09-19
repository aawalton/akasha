import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowsteps = {
  id: "01a0657d-02bf-7ad1-916e-1aff4efcdeb6",
  type: "page-type/world-skill",
  slug: "shadowsteps",
  title: "Shadowsteps",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
