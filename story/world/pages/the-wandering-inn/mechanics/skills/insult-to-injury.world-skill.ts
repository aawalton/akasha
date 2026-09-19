import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const insultToInjury = {
  id: "01a06575-981f-7e73-9de0-71965c4ead3c",
  type: "page-type/world-skill",
  slug: "insult-to-injury",
  title: "Insult to Injury",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
