import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const durablePicks = {
  id: "01a06575-9806-7ee4-9fe5-99c436ef4ddd",
  type: "page-type/world-skill",
  slug: "durable-picks",
  title: "Durable Picks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
