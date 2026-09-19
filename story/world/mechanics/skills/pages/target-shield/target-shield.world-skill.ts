import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const targetShield = {
  id: "01a0657d-0310-7b96-a142-042138cd862f",
  type: "page-type/world-skill",
  slug: "target-shield",
  title: "Target Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
