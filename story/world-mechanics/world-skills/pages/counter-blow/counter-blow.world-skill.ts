import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const counterBlow = {
  id: "01a06575-97fe-77e7-a841-ed6fc9ddbe26",
  type: "world-skill",
  slug: "counter-blow",
  title: "Counter Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
