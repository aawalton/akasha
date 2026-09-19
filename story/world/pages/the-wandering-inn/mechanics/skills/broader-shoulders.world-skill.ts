import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const broaderShoulders = {
  id: "01a06575-97f9-7ac8-b371-42d3025ea379",
  type: "page-type/world-skill",
  slug: "broader-shoulders",
  title: "Broader Shoulders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
