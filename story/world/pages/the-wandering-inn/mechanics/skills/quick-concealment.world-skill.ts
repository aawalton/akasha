import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickConcealment = {
  id: "01a0657d-029b-7545-a845-e715a70b66ca",
  type: "page-type/world-skill",
  slug: "quick-concealment",
  title: "Quick Concealment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
