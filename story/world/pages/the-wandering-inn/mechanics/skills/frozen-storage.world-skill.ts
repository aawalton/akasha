import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const frozenStorage = {
  id: "01a06575-9811-74fc-a5d6-dc6a5d0e97e8",
  type: "page-type/world-skill",
  slug: "frozen-storage",
  title: "Frozen Storage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
