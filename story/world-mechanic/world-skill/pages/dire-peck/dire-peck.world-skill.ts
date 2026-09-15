import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const direPeck = {
  id: "01a06575-9803-7adc-9379-b7fc4b646b44",
  type: "world-skill",
  slug: "dire-peck",
  title: "Dire Peck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
