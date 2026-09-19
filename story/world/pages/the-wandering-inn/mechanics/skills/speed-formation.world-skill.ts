import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedFormation = {
  id: "01a0657d-02ed-718e-8cd8-fa308aee12e8",
  type: "page-type/world-skill",
  slug: "speed-formation",
  title: "Speed Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
