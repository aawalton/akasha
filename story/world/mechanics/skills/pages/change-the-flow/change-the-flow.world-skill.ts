import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const changeTheFlow = {
  id: "01a06575-97fa-79b3-98f6-08cc76e1a92b",
  type: "page-type/world-skill",
  slug: "change-the-flow",
  title: "Change the Flow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
