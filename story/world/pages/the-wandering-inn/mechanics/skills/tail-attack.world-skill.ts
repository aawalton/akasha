import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tailAttack = {
  id: "01a0657d-0307-7d5b-89cd-62a4ec32008f",
  type: "page-type/world-skill",
  slug: "tail-attack",
  title: "Tail Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
