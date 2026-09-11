import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const counterSurpriseAttack = {
  id: "01a06575-97fe-704d-8164-0ca870df9440",
  type: "world-skill",
  slug: "counter-surprise-attack",
  title: "Counter: Surprise Attack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
