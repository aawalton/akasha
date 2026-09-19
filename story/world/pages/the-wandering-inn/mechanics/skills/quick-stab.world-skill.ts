import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickStab = {
  id: "01a0657d-029b-711e-bc74-599e3526d6d0",
  type: "page-type/world-skill",
  slug: "quick-stab",
  title: "Quick Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
