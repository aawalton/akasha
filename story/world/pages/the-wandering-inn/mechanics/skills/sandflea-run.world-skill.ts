import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sandfleaRun = {
  id: "01a0657d-02b7-7a14-b9c3-2eecf85d8a08",
  type: "page-type/world-skill",
  slug: "sandflea-run",
  title: "Sandflea Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
