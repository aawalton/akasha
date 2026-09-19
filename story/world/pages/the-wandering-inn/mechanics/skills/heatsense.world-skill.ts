import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heatsense = {
  id: "01a06575-9819-7472-b3fb-3c7e3b02661c",
  type: "page-type/world-skill",
  slug: "heatsense",
  title: "Heatsense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
