import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const desperateRallying = {
  id: "01a06575-9803-7de2-9900-5469147f17de",
  type: "page-type/world-skill",
  slug: "desperate-rallying",
  title: "Desperate Rallying",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
