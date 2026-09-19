import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groupSpeedRaiders = {
  id: "01a06575-9817-7376-8d95-9c7156cc0f4d",
  type: "page-type/world-skill",
  slug: "group-speed-raiders",
  title: "Group: Speed Raiders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
