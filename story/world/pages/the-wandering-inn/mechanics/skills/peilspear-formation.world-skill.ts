import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const peilspearFormation = {
  id: "01a0657d-028e-751d-b5aa-f9d89dcfbdce",
  type: "page-type/world-skill",
  slug: "peilspear-formation",
  title: "Peilspear Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
