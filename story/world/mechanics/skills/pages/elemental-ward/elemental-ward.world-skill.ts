import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elementalWard = {
  id: "01a06575-9807-7046-baaf-8447d2b39fe5",
  type: "page-type/world-skill",
  slug: "elemental-ward",
  title: "Elemental Ward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
