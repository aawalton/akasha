import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const exitNegotiations = {
  id: "01a06575-9809-7015-a191-ba02de341e48",
  type: "page-type/world-skill",
  slug: "exit-negotiations",
  title: "Exit Negotiations",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
