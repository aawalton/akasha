import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const elementalWard = {
  id: "01a06575-9807-7046-baaf-8447d2b39fe5",
  type: "world-skill",
  slug: "elemental-ward",
  title: "Elemental Ward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
