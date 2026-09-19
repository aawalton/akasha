import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doomshakerBlow = {
  id: "01a06575-9804-71db-becf-633e8c6f164c",
  type: "page-type/world-skill",
  slug: "doomshaker-blow",
  title: "Doomshaker Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
