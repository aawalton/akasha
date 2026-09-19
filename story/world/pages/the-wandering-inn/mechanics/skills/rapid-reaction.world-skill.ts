import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidReaction = {
  id: "01a0657d-02a4-706a-aff1-e5ab656b3104",
  type: "page-type/world-skill",
  slug: "rapid-reaction",
  title: "Rapid Reaction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
