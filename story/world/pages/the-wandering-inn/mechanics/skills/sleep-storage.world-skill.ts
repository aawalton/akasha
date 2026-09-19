import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sleepStorage = {
  id: "01a0657d-02c6-7ec4-8564-18a61b71d365",
  type: "page-type/world-skill",
  slug: "sleep-storage",
  title: "Sleep Storage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
