import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const decisiveBlows = {
  id: "01a06575-9802-7e2e-bda0-fb5ddd0f04f1",
  type: "page-type/world-skill",
  slug: "decisive-blows",
  title: "Decisive Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
