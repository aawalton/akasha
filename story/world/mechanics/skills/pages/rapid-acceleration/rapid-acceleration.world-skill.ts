import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidAcceleration = {
  id: "01a0657d-029c-7147-9fd3-e1f8e5119334",
  type: "page-type/world-skill",
  slug: "rapid-acceleration",
  title: "Rapid Acceleration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
