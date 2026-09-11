import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hillCleaver = {
  id: "01a06575-981a-7703-8eb6-c5febeacdc33",
  type: "world-skill",
  slug: "hill-cleaver",
  title: "Hill Cleaver",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
