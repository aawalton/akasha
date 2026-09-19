import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveDive = {
  id: "01a06575-9809-7db9-9184-9a3a2bdcfeae",
  type: "page-type/world-skill",
  slug: "evasive-dive",
  title: "Evasive Dive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
