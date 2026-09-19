import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforceWill = {
  id: "01a0657d-02a6-75ce-84c4-1dcae9570b59",
  type: "page-type/world-skill",
  slug: "reinforce-will",
  title: "Reinforce Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
