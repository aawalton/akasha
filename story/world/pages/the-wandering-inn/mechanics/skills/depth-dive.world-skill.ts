import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const depthDive = {
  id: "01a06575-9803-7f98-b484-dc75cbde572d",
  type: "page-type/world-skill",
  slug: "depth-dive",
  title: "Depth Dive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
