import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const adaptivePlumbing = {
  id: "01a06575-97e9-7807-9fac-a5d674442102",
  type: "world-skill",
  slug: "adaptive-plumbing",
  title: "Adaptive Plumbing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
