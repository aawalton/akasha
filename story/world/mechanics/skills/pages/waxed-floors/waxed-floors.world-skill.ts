import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const waxedFloors = {
  id: "01a0657d-032c-7361-9e5f-b72992269539",
  type: "page-type/world-skill",
  slug: "waxed-floors",
  title: "Waxed Floors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
