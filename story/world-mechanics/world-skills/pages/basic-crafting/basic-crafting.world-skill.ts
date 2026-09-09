import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicCrafting = {
  id: "01a06575-97f3-7943-a9ca-2e1380d59e67",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-crafting",
  title: "Basic Crafting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
