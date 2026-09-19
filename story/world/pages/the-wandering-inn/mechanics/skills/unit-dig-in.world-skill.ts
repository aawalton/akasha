import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitDigIn = {
  id: "01a0657d-031f-7498-bc5f-caf8ba79a970",
  type: "page-type/world-skill",
  slug: "unit-dig-in",
  title: "Unit: Dig In",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
