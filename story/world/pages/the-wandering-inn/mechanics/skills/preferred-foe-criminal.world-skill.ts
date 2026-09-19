import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const preferredFoeCriminal = {
  id: "01a0657d-0296-72bb-9671-7bcc206dee90",
  type: "page-type/world-skill",
  slug: "preferred-foe-criminal",
  title: "Preferred Foe: Criminal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
