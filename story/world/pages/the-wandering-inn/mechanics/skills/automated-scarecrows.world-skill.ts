import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automatedScarecrows = {
  id: "01a06575-97f0-7511-8ed7-61e9ab49db97",
  type: "page-type/world-skill",
  slug: "automated-scarecrows",
  title: "Automated Scarecrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
