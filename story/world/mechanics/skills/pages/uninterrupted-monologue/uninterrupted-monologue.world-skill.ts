import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const uninterruptedMonologue = {
  id: "01a0657d-031e-7b54-8b2e-6c6fc50fac46",
  type: "page-type/world-skill",
  slug: "uninterrupted-monologue",
  title: "Uninterrupted Monologue",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
