import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignoredInsult = {
  id: "01a06575-981c-7347-92b2-a2c70a63d598",
  type: "page-type/world-skill",
  slug: "ignored-insult",
  title: "Ignored Insult",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
