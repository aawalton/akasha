import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const getUpAndRun = {
  id: "01a06575-9814-7e06-8704-1ca6978bd696",
  type: "page-type/world-skill",
  slug: "get-up-and-run",
  title: "Get Up and Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
