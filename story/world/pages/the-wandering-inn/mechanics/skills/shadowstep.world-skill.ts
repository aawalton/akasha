import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowstep = {
  id: "01a0657d-02bf-7981-9b13-88525cd6fbca",
  type: "page-type/world-skill",
  slug: "shadowstep",
  title: "Shadowstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
