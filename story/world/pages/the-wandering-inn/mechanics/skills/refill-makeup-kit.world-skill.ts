import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const refillMakeupKit = {
  id: "01a0657d-02a6-7017-b018-f2e12c1449d5",
  type: "page-type/world-skill",
  slug: "refill-makeup-kit",
  title: "Refill Makeup Kit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
