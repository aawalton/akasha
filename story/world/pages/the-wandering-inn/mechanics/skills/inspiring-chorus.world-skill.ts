import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inspiringChorus = {
  id: "01a06575-981f-72db-9904-da51b307a031",
  type: "page-type/world-skill",
  slug: "inspiring-chorus",
  title: "Inspiring Chorus",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
