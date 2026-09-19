import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scytheCut = {
  id: "01a0657d-02b8-731f-8523-de39847d8d60",
  type: "page-type/world-skill",
  slug: "scythe-cut",
  title: "Scythe Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
