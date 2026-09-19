import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerStrokes = {
  id: "01a0657d-0296-7012-aed1-36ca2af17f9f",
  type: "page-type/world-skill",
  slug: "power-strokes",
  title: "Power Strokes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
