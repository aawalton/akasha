import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vows = {
  id: "01a0657d-032c-76f4-90a6-368cbe4868e8",
  type: "page-type/world-skill",
  slug: "vows",
  title: "Vows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
