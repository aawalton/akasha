import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const razorform = {
  id: "01a0657d-02a4-7a14-9731-3a68c45ea999",
  type: "page-type/world-skill",
  slug: "razorform",
  title: "Razorform",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
