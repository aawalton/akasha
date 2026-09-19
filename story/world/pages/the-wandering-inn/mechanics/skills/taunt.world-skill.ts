import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const taunt = {
  id: "01a0657d-0310-77b1-942d-de32d8213efd",
  type: "page-type/world-skill",
  slug: "taunt",
  title: "Taunt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
