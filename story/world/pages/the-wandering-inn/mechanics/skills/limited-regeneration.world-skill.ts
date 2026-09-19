import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const limitedRegeneration = {
  id: "01a0657d-023f-7dda-b2c5-c82981558992",
  type: "page-type/world-skill",
  slug: "limited-regeneration",
  title: "Limited Regeneration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
