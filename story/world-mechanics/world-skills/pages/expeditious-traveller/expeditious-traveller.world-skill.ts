import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expeditiousTraveller = {
  id: "01a06575-980a-7517-b27b-2b846f4171d6",
  type: "world-skill",
  slug: "expeditious-traveller",
  title: "Expeditious Traveller",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
