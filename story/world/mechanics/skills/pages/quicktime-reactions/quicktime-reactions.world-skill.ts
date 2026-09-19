import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quicktimeReactions = {
  id: "01a0657d-029c-7159-bec2-1522dd763c23",
  type: "page-type/world-skill",
  slug: "quicktime-reactions",
  title: "Quicktime Reactions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
