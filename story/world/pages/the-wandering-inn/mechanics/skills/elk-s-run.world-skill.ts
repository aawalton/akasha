import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elkSRun = {
  id: "01a06575-9807-73a0-8597-51a24baf4441",
  type: "page-type/world-skill",
  slug: "elk-s-run",
  title: "Elk’s Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
