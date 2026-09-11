import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const groupSpeedRaiders = {
  id: "01a06575-9817-7376-8d95-9c7156cc0f4d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "group-speed-raiders",
  title: "Group: Speed Raiders",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
