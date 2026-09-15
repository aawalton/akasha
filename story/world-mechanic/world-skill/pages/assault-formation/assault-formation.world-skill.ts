import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const assaultFormation = {
  id: "01a06575-97ee-716f-b96e-7966ef5bd4c1",
  type: "world-skill",
  slug: "assault-formation",
  title: "Assault Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
