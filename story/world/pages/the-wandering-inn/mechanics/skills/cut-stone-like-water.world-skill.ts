import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cutStoneLikeWater = {
  id: "01a06575-9800-72cf-8178-3db39bec0dc7",
  type: "page-type/world-skill",
  slug: "cut-stone-like-water",
  title: "Cut Stone Like Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
