import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const duststormKick = {
  id: "01a06575-9806-734b-b010-d4f74141a063",
  type: "page-type/world-skill",
  slug: "duststorm-kick",
  title: "Duststorm Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
