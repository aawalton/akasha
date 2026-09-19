import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nobleStrength = {
  id: "01a0657d-027b-7326-a1ed-51f2addee9a0",
  type: "page-type/world-skill",
  slug: "noble-strength",
  title: "Noble Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
