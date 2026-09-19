import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ridersOnTheStorm = {
  id: "01a0657d-02b2-78c2-b3f4-e15d2c6b677d",
  type: "page-type/world-skill",
  slug: "riders-on-the-storm",
  title: "Riders on the Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
