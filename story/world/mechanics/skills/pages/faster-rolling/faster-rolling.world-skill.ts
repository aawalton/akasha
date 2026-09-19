import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fasterRolling = {
  id: "01a06575-980c-7989-8d2e-52ba55f608c6",
  type: "page-type/world-skill",
  slug: "faster-rolling",
  title: "Faster Rolling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
