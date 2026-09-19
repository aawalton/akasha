import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalSeasonings = {
  id: "01a0657d-0271-7ee4-a483-486550872edf",
  type: "page-type/world-skill",
  slug: "natural-seasonings",
  title: "Natural Seasonings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
