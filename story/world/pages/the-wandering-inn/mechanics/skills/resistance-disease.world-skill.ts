import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceDisease = {
  id: "01a0657d-02b1-7658-8c99-0ef5a62b6232",
  type: "page-type/world-skill",
  slug: "resistance-disease",
  title: "Resistance: Disease",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
