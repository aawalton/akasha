import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicCrafting = {
  id: "01a06575-97f3-7943-a9ca-2e1380d59e67",
  type: "page-type/world-skill",
  slug: "basic-crafting",
  title: "Basic Crafting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
