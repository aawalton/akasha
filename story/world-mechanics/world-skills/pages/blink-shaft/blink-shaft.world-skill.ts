import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blinkShaft = {
  id: "01a06575-97f6-7753-8e74-68a715ef1c5e",
  type: "world-skill",
  slug: "blink-shaft",
  title: "Blink Shaft",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
