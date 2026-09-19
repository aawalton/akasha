import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const volleyOfArrows = {
  id: "01a0657d-032b-78d8-a628-044112a8aae7",
  type: "page-type/world-skill",
  slug: "volley-of-arrows",
  title: "Volley of Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
