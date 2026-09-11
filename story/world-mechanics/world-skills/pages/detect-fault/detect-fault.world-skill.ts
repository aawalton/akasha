import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectFault = {
  id: "01a06575-9803-7216-affd-3ec668ebb960",
  type: "world-skill",
  slug: "detect-fault",
  title: "Detect Fault",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
