import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const springwoodSupplies = {
  id: "01a0657d-02ee-7880-b952-a48e673de08f",
  type: "page-type/world-skill",
  slug: "springwood-supplies",
  title: "Springwood Supplies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
