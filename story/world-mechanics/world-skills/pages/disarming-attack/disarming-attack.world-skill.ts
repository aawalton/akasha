import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const disarmingAttack = {
  id: "01a06575-9804-7b4c-aa84-24bf975e5773",
  type: "world-skill",
  slug: "disarming-attack",
  title: "Disarming Attack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
