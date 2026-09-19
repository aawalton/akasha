import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicIdentificationAlchemy = {
  id: "01a06575-97f3-71c9-8f8d-190087a60a23",
  type: "page-type/world-skill",
  slug: "basic-identification-alchemy",
  title: "Basic Identification (Alchemy)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
