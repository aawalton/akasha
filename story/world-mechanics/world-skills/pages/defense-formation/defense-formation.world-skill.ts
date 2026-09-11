import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const defenseFormation = {
  id: "01a06575-9802-7c80-b453-cc58d0306b89",
  type: "world-skill",
  slug: "defense-formation",
  title: "Defense Formation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
