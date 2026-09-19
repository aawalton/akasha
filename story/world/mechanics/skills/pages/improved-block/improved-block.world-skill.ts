import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const improvedBlock = {
  id: "01a06575-981e-7ac6-924a-0920566b5ff1",
  type: "page-type/world-skill",
  slug: "improved-block",
  title: "Improved Block",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
