import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalSeasoning = {
  id: "01a0657d-0271-7c48-b14e-a2c63eb40b57",
  type: "page-type/world-skill",
  slug: "natural-seasoning",
  title: "Natural Seasoning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
