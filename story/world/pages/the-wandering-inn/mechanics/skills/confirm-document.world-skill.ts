import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const confirmDocument = {
  id: "01a06575-97fc-7c31-990d-850b63b49373",
  type: "page-type/world-skill",
  slug: "confirm-document",
  title: "Confirm Document",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
