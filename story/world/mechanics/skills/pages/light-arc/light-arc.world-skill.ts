import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightArc = {
  id: "01a0657d-023a-739f-9c2d-424a064e3026",
  type: "page-type/world-skill",
  slug: "light-arc",
  title: "Light Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
