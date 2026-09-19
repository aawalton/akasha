import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const interceptionFire = {
  id: "01a06575-9820-7665-b30a-d51b384284a7",
  type: "page-type/world-skill",
  slug: "interception-fire",
  title: "Interception Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
