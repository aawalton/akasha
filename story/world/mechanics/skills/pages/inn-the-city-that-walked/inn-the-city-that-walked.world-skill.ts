import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innTheCityThatWalked = {
  id: "01a06575-981f-71aa-8af2-03bb80954b50",
  type: "page-type/world-skill",
  slug: "inn-the-city-that-walked",
  title: "Inn: The City that Walked",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
