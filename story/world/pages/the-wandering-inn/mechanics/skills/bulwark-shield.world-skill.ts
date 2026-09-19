import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bulwarkShield = {
  id: "01a06575-97f9-753e-b1f0-57ff14078e67",
  type: "page-type/world-skill",
  slug: "bulwark-shield",
  title: "Bulwark Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
