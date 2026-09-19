import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserWallOfForce = {
  id: "01a06575-9823-7d76-87bc-feaeaba4537a",
  type: "page-type/world-skill",
  slug: "lesser-wall-of-force",
  title: "Lesser Wall of Force",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
