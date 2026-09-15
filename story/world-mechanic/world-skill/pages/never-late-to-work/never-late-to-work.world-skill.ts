import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const neverLateToWork = {
  id: "01a0657d-027b-77c9-b1a5-d210494e0bbe",
  type: "world-skill",
  slug: "never-late-to-work",
  title: "Never Late To Work",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
