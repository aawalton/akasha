import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stealthWing = {
  id: "01a0657d-02f9-7888-858f-3004d3bd5cbe",
  type: "page-type/world-skill",
  slug: "stealth-wing",
  title: "Stealth Wing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
