import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserTinkering = {
  id: "01a06575-9823-7efa-b7db-23bc2defad82",
  type: "world-skill",
  slug: "lesser-tinkering",
  title: "Lesser Tinkering",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
