import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidCounter = {
  id: "01a0657d-02a4-74f2-9024-5513110c17f7",
  type: "page-type/world-skill",
  slug: "rapid-counter",
  title: "Rapid Counter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
