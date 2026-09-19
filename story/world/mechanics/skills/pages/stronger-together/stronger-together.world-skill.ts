import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const strongerTogether = {
  id: "01a0657d-02fe-7c76-b910-0445fc2972ef",
  type: "page-type/world-skill",
  slug: "stronger-together",
  title: "Stronger Together",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
