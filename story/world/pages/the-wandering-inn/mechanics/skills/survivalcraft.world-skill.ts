import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const survivalcraft = {
  id: "01a0657d-0303-7bc1-bc3f-a74b3cc67785",
  type: "page-type/world-skill",
  slug: "survivalcraft",
  title: "Survivalcraft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
