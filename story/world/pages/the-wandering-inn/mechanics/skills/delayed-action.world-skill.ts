import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delayedAction = {
  id: "01a06575-9802-7956-b6fe-b1c44c8d8872",
  type: "page-type/world-skill",
  slug: "delayed-action",
  title: "Delayed Action",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
