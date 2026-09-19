import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const runFree = {
  id: "01a0657d-02b7-7c79-9630-c799f1604992",
  type: "page-type/world-skill",
  slug: "run-free",
  title: "Run Free",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
