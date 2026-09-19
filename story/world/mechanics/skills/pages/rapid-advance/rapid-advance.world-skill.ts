import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidAdvance = {
  id: "01a0657d-02a4-7a94-b679-9ba9ec492686",
  type: "page-type/world-skill",
  slug: "rapid-advance",
  title: "Rapid Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
