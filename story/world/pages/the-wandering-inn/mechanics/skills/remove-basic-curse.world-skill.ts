import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeBasicCurse = {
  id: "01a0657d-02b0-763a-b030-06fc436afa81",
  type: "page-type/world-skill",
  slug: "remove-basic-curse",
  title: "Remove Basic Curse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
