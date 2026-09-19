import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groupErraticManeuvering = {
  id: "01a06575-9817-7528-8e6b-44ffc12621e9",
  type: "page-type/world-skill",
  slug: "group-erratic-maneuvering",
  title: "Group: Erratic Maneuvering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
