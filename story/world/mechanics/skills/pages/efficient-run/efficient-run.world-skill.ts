import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const efficientRun = {
  id: "01a06575-9807-79cd-86cb-40ea2bf91bbc",
  type: "page-type/world-skill",
  slug: "efficient-run",
  title: "Efficient Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
