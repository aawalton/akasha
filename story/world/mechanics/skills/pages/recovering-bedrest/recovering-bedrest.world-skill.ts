import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recoveringBedrest = {
  id: "01a0657d-02a6-7b77-a5dd-acb68a2169a1",
  type: "page-type/world-skill",
  slug: "recovering-bedrest",
  title: "Recovering Bedrest",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
