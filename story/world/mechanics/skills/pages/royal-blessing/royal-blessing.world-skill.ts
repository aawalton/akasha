import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalBlessing = {
  id: "01a0657d-02b6-7830-9ef9-24d2680d92e0",
  type: "page-type/world-skill",
  slug: "royal-blessing",
  title: "Royal Blessing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
