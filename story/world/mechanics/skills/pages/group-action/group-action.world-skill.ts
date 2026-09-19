import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groupAction = {
  id: "01a06575-9817-7ac5-87f4-587f1f57b6c2",
  type: "page-type/world-skill",
  slug: "group-action",
  title: "Group Action",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
