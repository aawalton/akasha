import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmTheFoe = {
  id: "01a06575-9804-72a2-8c57-32ec246af931",
  type: "page-type/world-skill",
  slug: "disarm-the-foe",
  title: "Disarm the Foe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
