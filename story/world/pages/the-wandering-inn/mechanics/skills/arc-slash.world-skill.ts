import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcSlash = {
  id: "01a06575-97ec-79b2-8486-8788bea56568",
  type: "page-type/world-skill",
  slug: "arc-slash",
  title: "Arc Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
