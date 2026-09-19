import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicAlchemy = {
  id: "01a06575-97f3-7e8b-b3f3-bfa51993a7de",
  type: "page-type/world-skill",
  slug: "basic-alchemy",
  title: "Basic Alchemy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
