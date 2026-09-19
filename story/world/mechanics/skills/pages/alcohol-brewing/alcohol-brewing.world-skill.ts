import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alcoholBrewing = {
  id: "01a06575-97ea-71e0-9035-5f125abfca3c",
  type: "page-type/world-skill",
  slug: "alcohol-brewing",
  title: "Alcohol Brewing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
