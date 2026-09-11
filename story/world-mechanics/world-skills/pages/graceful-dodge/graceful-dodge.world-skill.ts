import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const gracefulDodge = {
  id: "01a06575-9815-75c6-89f0-76d944e7cc06",
  type: "world-skill",
  slug: "graceful-dodge",
  title: "Graceful Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
