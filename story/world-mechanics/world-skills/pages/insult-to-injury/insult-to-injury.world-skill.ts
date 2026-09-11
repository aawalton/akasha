import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const insultToInjury = {
  id: "01a06575-981f-7e73-9de0-71965c4ead3c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "insult-to-injury",
  title: "Insult to Injury",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
