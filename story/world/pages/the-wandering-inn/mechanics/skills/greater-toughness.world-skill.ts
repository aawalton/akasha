import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterToughness = {
  id: "01a06575-9817-723c-8ec3-3bc6b266dbd7",
  type: "page-type/world-skill",
  slug: "greater-toughness",
  title: "Greater Toughness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
