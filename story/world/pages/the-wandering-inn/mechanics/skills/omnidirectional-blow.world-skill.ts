import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const omnidirectionalBlow = {
  id: "01a0657d-027c-7a86-a15f-64c467199bd0",
  type: "page-type/world-skill",
  slug: "omnidirectional-blow",
  title: "Omnidirectional Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
