import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const glidingSteps = {
  id: "01a06575-9815-764e-95cd-1c5354185e21",
  type: "page-type/world-skill",
  slug: "gliding-steps",
  title: "Gliding Steps",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
