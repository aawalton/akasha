import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalReversion = {
  id: "01a0657d-0271-7389-83fb-f95c45b8486e",
  type: "page-type/world-skill",
  slug: "natural-reversion",
  title: "Natural Reversion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
