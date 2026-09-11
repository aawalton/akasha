import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const holyHammer = {
  id: "01a06575-981a-7cab-8c4d-1baf86aeba30",
  type: "world-skill",
  slug: "holy-hammer",
  title: "Holy Hammer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
