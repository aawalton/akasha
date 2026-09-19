import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flawlessDodge = {
  id: "01a06575-980e-7fdd-b9b1-7bf659071cdb",
  type: "page-type/world-skill",
  slug: "flawless-dodge",
  title: "Flawless Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
