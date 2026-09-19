import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oneDayBloom = {
  id: "01a0657d-027c-781f-919b-7d8764193322",
  type: "page-type/world-skill",
  slug: "one-day-bloom",
  title: "One Day Bloom",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
