import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightspeedReaction = {
  id: "01a0657d-023f-7e12-9914-a4196eea12f3",
  type: "page-type/world-skill",
  slug: "lightspeed-reaction",
  title: "Lightspeed Reaction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
