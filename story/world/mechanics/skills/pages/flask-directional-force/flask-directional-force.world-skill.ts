import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flaskDirectionalForce = {
  id: "01a06575-980e-7c6e-be38-893f48f9f4c6",
  type: "page-type/world-skill",
  slug: "flask-directional-force",
  title: "Flask: Directional Force",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
