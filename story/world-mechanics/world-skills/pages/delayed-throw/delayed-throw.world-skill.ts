import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const delayedThrow = {
  id: "01a06575-9802-7e11-b9ed-2bdca5a5c217",
  type: "world-skill",
  slug: "delayed-throw",
  title: "Delayed Throw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
